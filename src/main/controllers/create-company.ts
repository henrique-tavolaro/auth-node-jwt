import { NextFunction, Request, Response } from "express";
import { ApiErrors } from "../../domain/errors/api-errors";
import { IController } from "../../domain/interfaces/icontroller";
import { IRepository } from "../../domain/repositories/i-repository";

export class CreateCompanyController implements IController {
    constructor(
        private repository: IRepository
    ) { }

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {

        try {
            const { name } = request.body;

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

            await this.repository.createCompany(request.body);

            return response.status(201).json({ message: "Company created successfully" })

        } catch (error) {
            console.log('Error in controller create company', error);
            next(error);
        }
    }
}