import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/authConfig';

export default function isAuthenticate(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token is missing', 401);
    }

    //Bearer

    const [, token] = authHeader.split(' ');

    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const decodedToken = verify(token, authConfig.jwt.secret);


        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}
 