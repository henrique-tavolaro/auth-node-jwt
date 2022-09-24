import jwt from 'jsonwebtoken';
import { env } from "../config/env";

export const generateToken = (params = {}) => {
    return jwt.sign({
        params
    }, env.SECRET!, {
        expiresIn: 86400
    })
}