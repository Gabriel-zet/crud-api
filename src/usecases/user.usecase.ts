import { prisma } from "../database/prisma-client";
import { UserCreate, UserRepository, UserUpdate, UserView } from "../interfaces/users.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";
import bcrypt from 'bcrypt'

export class UserUseCase {
    private userRepository: UserRepository
    constructor() {
        this.userRepository = new UserRepositoryPrisma()
    }
    async view({ email }: UserView) {
        if (!email || email == null) {
            console.error('Email passado incorretamente')
            return
        }
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
                select: {
                    email: true,
                    name: true,
                    password: false
                },
            })
            console.table(user)
        }
        catch (error) {
            console.error(error)
        }
    }


    async create({ name, email, password }: UserCreate) {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds)

            const user = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    password: hashedPassword,
                    role: 0
                }
            })
            console.table(user)
        } catch (error) {
            console.error(error)
        }

    }

    async update({ id, name, email, password }: UserUpdate) {
        try {
            const user = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    name: name,
                    email: email,
                    password: password,
                }
            })
            console.table(user)
        } catch (error) {
            console.error(error)
        }
    }

    async delete(id: any) {
        try {
            const user = await prisma.user.delete({
                where: {
                    id: parseInt(id)
                }
            })
            console.table(user)
        } catch (error) {
            console.error(error)
        }
    }
}