import { NextFunction, Request, Response, Router } from "express";
import { schemaValidation, validate } from "../middlewares/validate";
import { auth } from "../middlewares/auth";
import { makeCreateCompanyController } from "../factories/make-create-company";
import { makeCreateUserController } from "../factories/make-create-user";
import { makeDeleteUserController } from "../factories/make-delete-user";
import { makeDeleteCompanyController } from "../factories/make-delete-company";
import { makeListCompaniesController } from "../factories/make-list-companies";
import { makeListUsersController } from "../factories/make-list-users";
import { makeLoginUserController } from "../factories/make-login-user";
import errorMiddleware from "../middlewares/error-middleware";

export const router = Router();

router.post('/newuser',
    schemaValidation,
    validate,
    async (request: Request, response: Response) => {
        await makeCreateUserController().handle(request, response)
    });

router.delete('/user',
    async (request: Request, response: Response) => {
        await makeDeleteUserController().handle(request, response)
    })

router.get('/users',
    async (request: Request, response: Response) => {
        await makeListUsersController().handle(request, response)
    })

router.post('/login',
    schemaValidation,
    validate,
    async (request: Request, response: Response, next: NextFunction) => {
       return await makeLoginUserController().handle(request, response, next);
    });

//todo
router.post('/reset-password',
    async (request: Request, response: Response) => {
        await makeCreateUserController().handle(request, response)
    })

router.post('/newcompany',
    async (request: Request, response: Response) => {
        await makeCreateCompanyController().handle(request, response);
    })

router.get('/companies',
    async (request: Request, response: Response) => {
        await makeListCompaniesController().handle(request, response)
    })

router.delete('/company',
    async (request: Request, response: Response) => {
        await makeDeleteCompanyController().handle(request, response)
    })

router.get('/dashboard',
    auth,
    async (request: Request, response: Response) => {
        await response.json({ message: 'ok' })
    })