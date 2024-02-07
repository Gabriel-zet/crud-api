import { Request, Response, NextFunction } from 'express';
import { UserUseCase } from '../usecases/user.usecase';

const userUseCase = new UserUseCase();

export const verifyRole = async (req: Request, res: Response, next: NextFunction) => {
    const role = await obterPapeldoUsuario(req);

    if (role === 0) {
        res.status(403).send({ message: 'Você não tem permissão para acessar esta rota!' });
    } else if (role === undefined) {
        return res.status(403).send({ message: 'Erro ao obter o papel do usuário. Acesso negado.' });
    } else {
        next();
    }
};

const obterPapeldoUsuario = async (req: Request): Promise<number | undefined> => {
    const email = req.cookies.email;

    try {
        const userInfo = await userUseCase.view({ email });

        if (!userInfo || userInfo.role === undefined) {
            console.error("Erro ao obter papel do usuário");
            return undefined;
        } else {
            const role = userInfo.role;
            return role;
        }
    } catch (error) {
        console.error("Erro ao obter papel do usuário", error);
        return undefined;
    }
};
