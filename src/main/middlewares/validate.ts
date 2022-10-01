import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { ApiErrors } from "../../domain/errors/api-errors";

export const schemaValidation = [
    body("email").isEmail().trim().escape().normalizeEmail().withMessage('e-mail invalid'),
    body('password').isLength({ min: 8 }).withMessage('password invalid')
]

export function validate(req: Request, res: Response, next: NextFunction) {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        throw ApiErrors.badRequest(
            'Email or password invalid'
        )
    }
    next();
}