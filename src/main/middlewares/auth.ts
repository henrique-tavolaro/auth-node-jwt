import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { env } from "../../config/env";


export function auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({
            error: 'No token provided'
        });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2){
        return res.status(401).json({
            error: 'Token error'
        });
    }

    const [ scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)){
        return res.status(401).json({
            error: 'Token malformatted'
        });
    }

    jwt.verify(token, env.SECRET!, (err, decoded: any) => {
        if(err) {
            return res.status(401).json({
                error: 'Token malformatted'
            });
        }
        req.app.locals.userId = decoded.id
        return next();
    })

}