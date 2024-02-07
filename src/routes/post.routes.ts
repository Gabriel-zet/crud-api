import express from "express"
import { PostUseCase } from "../usecases/post.usecase";
import { verifyRole } from "../middleware/adminAuth";
import { authToken } from "../middleware/verificarToken";

const router = express.Router();
const postUseCase = new PostUseCase();

router.post('/post', verifyRole, async (req, res) => { // Create
    const { title, description } = req.body
    if (!title || !description) {
        return res.status(400).json({ error: "Erro no title ou descricao" })
    }
    try {
        const data = await postUseCase.create({
            title,
            description
        })
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
})

router.get('/post/:title', async (req, res) => { // Read one 
    const { title } = req.params;

    try {
        const data = await postUseCase.view({
            title
        })
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
})

router.get('/post', authToken, async (req, res) => { // Read all
    try {
        const data = await postUseCase.viewAll()
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
})

router.put('/post/:id', verifyRole, async (req, res) => { // Update one
    const id = parseInt(req.params.id);
    const { title, description, isVisible } = req.body;
    try {
        const data = await postUseCase.update(id, {
            title,
            description,
            isVisible

        })
        return res.status(200).json(data)
    } catch (error) {

    }
})

router.delete('/post', verifyRole, async (req, res) => {
    const { id } = req.body;

    try {
        const data = await postUseCase.delete(id)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500)
    }
})
export { router as postRoutes };