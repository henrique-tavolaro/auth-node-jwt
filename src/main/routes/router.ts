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

export const router = Router();

router.post('/newuser',
    schemaValidation,
    validate,
    async (request: Request, response: Response, next: NextFunction) => {
        await makeCreateUserController().handle(request, response, next)
    });

router.delete('/user',
    async (request: Request, response: Response, next: NextFunction) => {
        await makeDeleteUserController().handle(request, response, next)
    })

router.get('/users',
    async (request: Request, response: Response, next: NextFunction) => {
        await makeListUsersController().handle(request, response, next)
    })

//todo
router.post('/reset-password',
    async (request: Request, response: Response, next: NextFunction) => {
        await makeCreateUserController().handle(request, response, next)
    })

router.post('/newcompany',
    async (request: Request, response: Response, next: NextFunction) => {
        await makeCreateCompanyController().handle(request, response, next);
    })

router.get('/companies',
    async (request: Request, response: Response, next: NextFunction) => {
        await makeListCompaniesController().handle(request, response, next)
    })

router.delete('/company',
    async (request: Request, response: Response, next: NextFunction) => {
        await makeDeleteCompanyController().handle(request, response, next)
    })

router.get('/dashboard',
    async (request: Request, response: Response, next: NextFunction) => {
        await response.json({ message: 'ok' })
    })