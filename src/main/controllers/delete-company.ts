import { NextFunction, Request, Response } from "express";
import { ApiErrors } from "../../domain/errors/api-errors";
import { IController } from "../../domain/interfaces/icontroller";
import { IRepository } from "../../domain/repositories/i-repository";

export class DeleteCompanyController implements IController {
    constructor(
        private repository: IRepository
    ) { }

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const _id = request.body;

            if(request.app.locals.role != 'admin' ){
                throw ApiErrors.unauthorizedError(
                    "User don't have admin rights"
                )
            }

            if (_id == null || _id == undefined) {
                throw ApiErrors.badRequest(
                    `No company id provided`
                )
            }

            await this.repository.deleteCompany(_id);

            return response.status(201).json({ message: "Company deleted successfully" })

        } catch (error) {
            console.log('Error in controller delete company', error);
            next(error);
        }
    }
}