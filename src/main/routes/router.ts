import { Request, Response, Router } from "express";
import { schemaValidation, validate } from "../middlewares/validate";
import { CreateUserController } from "../../controllers/create-user";
import { LoginUserController } from "../../controllers/login-user";
import { auth } from "../middlewares/auth";

export const router = Router();

router.post('/user',
    schemaValidation,
    validate,
    async (request: Request, response: Response) => {
        await new CreateUserController().handle(request, response)
    });

router.post('/login',
    schemaValidation,
    validate,
    async (request: Request, response: Response) => {
        await new LoginUserController().handle(request, response);
    });

router.get('/dashboard',
        auth,
        async (request: Request, response: Response) => {
            return await response.json({message: 'ok'})
        })