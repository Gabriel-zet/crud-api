import { prisma } from "../database/prisma-client";
import { User, UserCreate, UserRepository, UserUpdate } from "../interfaces/users.interface";

class UserRepositoryPrisma implements UserRepository {
    async create(data: UserCreate): Promise<User> {
        const result = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                role: 0
            }
        })
        return result;
    }
    async update(id: number, data: UserUpdate): Promise<User> {
        const result = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            }
        });
        return result;
    }
    async delete(id: number): Promise<User> {
        const result = await prisma.user.delete({
            where: {
                id: id
            }
        });
        return result;
    }
}

export { UserRepositoryPrisma }
