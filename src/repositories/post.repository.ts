import { prisma } from "../database/prisma-client";
import { Post, PostCreate, PostRepository, PostUpdate } from "../interfaces/posts.interface"

class PostRepositoryPrisma implements PostRepository {
    async create(data: PostCreate): Promise<Post> {
        const result = await prisma.post.create({
            data: {
                title: data.title,
                description: data.description,
                isVisible: false
            }
        })
        return result;
    }
    async update(id: number, data: PostUpdate): Promise<Post> {
        const result = await prisma.post.update({
            where: {
                id: id
            },
            data: {
                title: data.title,
                description: data.description,
                isVisible: data.isVisible,
            }
        })
        return result;
    }
    async delete(id: number): Promise<Post> {
        const result = await prisma.post.delete({
            where: {
                id: id
            }
        });
        return result;
    }
}

export { PostRepositoryPrisma }