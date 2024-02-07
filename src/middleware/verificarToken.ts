import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../server';

export const authToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            console.error('Token ausente');
            return res.status(401).json({ error: 'Token ausente' });
        }

        const token = authorizationHeader.replace('Bearer ', '');

        console.log('Token recebido:', token);

        const decoded = jwt.verify(token, jwtSecret, { algorithms: ['HS256'] });
        console.log('Token decodificado:', decoded);

        next();
    } catch (error) {
        console.error('Erro na autenticação:', error);
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
};
