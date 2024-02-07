import express from "express";
import { UserUseCase } from '../usecases/user.usecase'
import { UserCreate, UserLogin } from "../interfaces/users.interface";
import { UserLoginCase } from "../usecases/user.logincase";
import { authToken } from "../middleware/verificarToken";
import { verifyRole } from "../middleware/adminAuth";

const router = express.Router();
const userUseCase = new UserUseCase();
const userLoginCase = new UserLoginCase();


router.post<{ Body: UserCreate }>('/user', async (req, res) => { // Create
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Dados inválidos" });
        }

        const data = await userUseCase.create({
            name,
            email,
            password
        });

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});

router.get('/user/:email', async (req, res) => { // Read
    const { email } = req.params;
    if (!email || email === undefined) {
        console.error("Erro no email!");
        return res.status(400).json({ error: "E-mail ausente na solicitação" });
    }

    try {
        const data = await userUseCase.view({ email });
        console.log(data);
        return res.status(200).json(data);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});


router.get('/teste', authToken, verifyRole, (req, res) => { // Init
    res.status(200).json({ hello: 'world' });
});

router.put('/user', verifyRole, async (req, res) => {
    const { email, password, name, id } = req.body;

    try {
        const data = await userUseCase.update({
            name,
            id,
            password,
            email
        })
        return res.status(200).json(data);
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
})

router.delete('/user', verifyRole, async (req, res) => { // Delete
    const { id } = req.body
    try {
        const data = await userUseCase.delete(id)
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
})


router.post('/user/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password || email === undefined || password === undefined) {
        return res.status(400).json({ message: 'Email ou senha passados incorretamente' });
    }

    try {
        const user = await userLoginCase.login({
            email,
            password
        });
        console.table(user)
        console.log(user?.token)
        if (user !== null && user !== undefined) {
            if (user.success == true) {
                return res.status(200).json({ message: 'Login bem sucedido!' })
            } else {
                return res.status(401).json({ message: 'Credenciais Incorretas' })
            }
        }

    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
})



export { router as userRoutes };
