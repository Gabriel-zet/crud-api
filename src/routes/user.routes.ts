import express from "express";
import { UserUseCase } from '../usecases/user.usecase'
import { UserCreate } from "../interfaces/users.interface";


const router = express.Router();
const userUseCase = new UserUseCase();

router.post<{ Body: UserCreate }>('/create', async (req, res) => { // Create
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

router.get('/view', async (req, res) => { // Read
    const email = req.body.email;

    try {
        const data = await userUseCase.view({
            email
        });
        return res.status(200).json(data);

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
})

router.get('/teste', (req, res) => { // Init
    res.status(200).json({ hello: 'world' });
});

router.post('/update', async (req, res) => {
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

router.post('/delete', async (req, res) => { // Delete
    const { id } = req.body
    try {
        const data = await userUseCase.delete(id)
        return res.status(200).json(data);
    } catch (error) {

    }
})

export { router as userRoutes };
