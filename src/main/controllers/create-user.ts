import { NextFunction, Request, Response } from "express";
import { ApiErrors } from "../../domain/errors/api-errors";
import { IController } from "../../domain/interfaces/icontroller";
import { IRepository } from "../../domain/repositories/i-repository";

export class CreateUserController implements IController {
    constructor(
        private repository: IRepository
    ) { }

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
        try {

            const { name, email, password, company, role } = request.body;

            if(request.app.locals.role != 'admin' ){
                throw ApiErrors.unauthorizedError(
                    "User don't have admin rights"
                )
            }

            if (name == null || name == undefined) {
                throw ApiErrors.badRequest(
                    `Empty field name`
                )
            }

            if (email == null || email == undefined) {
                throw ApiErrors.badRequest(
                    `Empty field email`
                )
            }

            if (password == null || password == undefined) {
                throw ApiErrors.badRequest(
                    `Empty field password`
                )
            }

            if (company == null || company == undefined) {
                throw ApiErrors.badRequest(
                    `Empty field company`
                )
            }
            
            if (role == null || role == undefined) {
                throw ApiErrors.badRequest(
                    `Empty field role`
                )
            }

            await this.repository.createUser(request.body);

            return response.status(201).json({
                message: "User created successfully"
            })

        } catch (error) {
            console.log('Error in controller create user', error);
            next(error)
        }
    }
}