import { NextFunction, Request, Response } from "express";
import { IController } from "../../domain/interfaces/icontroller";
import { IRepository } from "../../domain/repositories/i-repository";

export class ListCompaniesController implements IController {

    constructor(
        private repository: IRepository
    ) { }
    
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const result = await this.repository.listCompanies();

            return response.status(201).json({data: result})

        } catch (error) {
            console.log('Error in controller list companies', error);
            next(error);
        }
    
    }
    
}