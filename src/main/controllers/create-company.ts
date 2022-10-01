import { Request, Response } from "express";
import { BadRequestError } from "../../domain/errors/bad-request";
import { IController } from "../../domain/interfaces/icontroller";
import { IRepository } from "../../domain/repositories/i-repository";

export class CreateCompanyController implements IController {
    constructor(
        private repository: IRepository
    ) { }

    async handle(request: Request, response: Response): Promise<Response | undefined> {

        try {
            const { name } = request.body;

            if (name == null || name == undefined) {
                throw new BadRequestError(
                    `Empty field name`
                )
            
            }

            await this.repository.createCompany(request.body);

            return response.status(201).json({ message: "Company created successfully" })

        } catch (error) {
            console.log('Error in controller create company', error);
        }
    }
}