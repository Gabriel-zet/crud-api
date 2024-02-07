import { prisma } from "../database/prisma-client";
import { CategoryRepositoryPrisma } from "../repositories/category.repository";
import { CategoryCreate, CategoryRepository, CategoryView } from "../interfaces/categories.interface";

export class CategoryUseCase {
    private categoryRepository: CategoryRepository
    constructor() {
        this.categoryRepository = new CategoryRepositoryPrisma()
    }
    async create({ title, description }: CategoryCreate) {
        try {
            const category = await prisma.category.create({
                data: {
                    description: description,
                    title: title,
                    isVisible: false
                }
            })
            return category;
        } catch (error) {
            console.log(error)
        }
    }

    async view({ title }: CategoryView) {
        if (!title || title == null) {
            console.error('titulo passado incorretamente')
            return;
        }

        try {
            const category = await prisma.category.findFirst({
                where: {
                    title: title
                },
                select: {
                    id: true,
                    description: true,
                    title: true
                }
            })
            return category;
        } catch (error) {
            console.error(error)
        }
    }

    async viewAll() {
        try {
            const categories = await prisma.category.findMany({})
            console.table(categories)
            return categories
        } catch (error) {
            console.error(error)
        }
    }

    async delete(id: any) {
        try {
            const category = await prisma.category.delete({
                where: {
                    id: parseInt(id)
                }
            })
            console.table(category)
        } catch (error) {
            console.error(error)
        }
    }
}