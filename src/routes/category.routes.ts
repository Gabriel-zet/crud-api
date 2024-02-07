import express from "express";
import { CategoryUseCase } from "../usecases/category.usecase";
import { verifyRole } from "../middleware/adminAuth";
import { authToken } from "../middleware/verificarToken";

const router = express.Router()
const categoryUseCase = new CategoryUseCase()

router.post('/category', verifyRole, async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: "Erro no title ou descricao" })
    }
    try {
        const data = await categoryUseCase.create({
            title,
            description
        });
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
})

router.get('/category/:title', verifyRole, authToken, async (req, res) => {
    const { title } = req.params;
    console.log(title)
    try {
        const data = await categoryUseCase.view({
            title
        })
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do Servidor" })
    }
})

router.get('/category', verifyRole, authToken, async (req, res) => {
    try {
        const data = await categoryUseCase.viewAll()
        console.table(data)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor!" })
    }
})

router.delete('/category', verifyRole, async (req, res) => {
    const { id } = req.body;
    try {
        const data = await categoryUseCase.delete(id)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ erro: "Erro interno no servidor!" })
    }
})

export { router as categoryRoutes };