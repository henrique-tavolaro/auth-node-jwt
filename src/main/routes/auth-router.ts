import { NextFunction, Request, Response, Router } from "express";
import { makeLoginUserController } from "../factories/make-login-user";
import { schemaValidation, validate } from "../middlewares/validate";

export const authRouter = Router();

authRouter.post('/login',
    schemaValidation,
    validate,
    async (request: Request, response: Response, next: NextFunction) => {
        return await makeLoginUserController().handle(request, response, next);
    });