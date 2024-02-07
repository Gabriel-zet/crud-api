import { prisma } from "../database/prisma-client";
import { PostCreate, PostRepository, PostUpdate, PostView } from "../interfaces/posts.interface";
import { PostRepositoryPrisma } from "../repositories/post.repository";

export class PostUseCase {
    private postRepository: PostRepository
    constructor() {
        this.postRepository = new PostRepositoryPrisma()
    }
    async view({ title }: PostView) {
        if (!title || title == null) {
            console.error('titulo passado incorretamente')
            return
        }
        try {
            const post = await prisma.post.findFirst({
                where: {
                    title: title
                },
                select: {
                    id: true,
                    description: true,
                    title: true,
                },
            })
            console.table(post)
        } catch (error) {
            console.error(error)
        }
    }
    async viewAll() {
        try {
            const posts = await prisma.post.findMany({})
            console.table(posts)
            return posts
        } catch (error) {
            console.error(error)
        }
    }
    async create({ title, description }: PostCreate) {
        try {
            const post = await prisma.post.create({
                data: {
                    description: description,
                    title: title,
                    isVisible: false
                }
            })
            console.table(post)
        } catch (error) {
            console.error(error)
        }
    }
    async update(id: number, { title, description, isVisible }: PostUpdate) {
        try {
            const post = await prisma.post.update({
                where: {
                    id: id
                },
                data: {
                    title: title,
                    description: description,
                    isVisible: isVisible,
                }
            })
        } catch (error) {
            console.error(error)
        }
    }
    async delete(id: any) {
        try {
            const post = await prisma.post.delete({
                where: {
                    id: parseInt(id)
                }
            })
            return post;
        } catch (error) {
            console.error(error)
        }
    }

}