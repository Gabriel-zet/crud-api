import { prisma } from "../database/prisma-client";
import { Category, CategoryCreate, CategoryRepository } from "../interfaces/categories.interface";

class CategoryRepositoryPrisma implements CategoryRepository {
    async create(data: CategoryCreate): Promise<Category> {
        const result = await prisma.category.create({
            data: {
                title: data.title,
                description: data.description,
                isVisible: false
            }
        })
        return result
    }

    async delete(id: number): Promise<Category> {
        const result = await prisma.category.delete({
            where: {
                id: id
            }
        })
        return result;
    }
}

export { CategoryRepositoryPrisma }