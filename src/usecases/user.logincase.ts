import { prisma } from "../database/prisma-client";
import { UserLogin } from "../interfaces/users.interface";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"

import { jwtSecret } from "../server";

export class UserLoginCase {
    async login({ email, password }: UserLogin) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
                select: {
                    name: true,
                    password: true,
                    id: true,
                },
            });

            if (!user) {
                return { success: false, message: "Usuário não encontrado" };
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return { success: false, message: "Senha incorreta" };
            }

            const token = jwt.sign({ userId: user.id }, jwtSecret, {
                expiresIn: '2h',
                algorithm: 'HS256'
            });

            return { success: true, user: { name: user.name }, token: token };

        } catch (error) {
            console.error("Erro durante a autenticação:", error);
            return { success: false, message: "Erro durante a autenticação" };
        }
    }
}
