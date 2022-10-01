import { Request, Response } from "express";
import { BadRequestError } from "../../domain/errors/bad-request";
import { IController } from "../../domain/interfaces/icontroller"
import { IRepository } from "../../domain/repositories/i-repository";
import { User } from "../../infra/schema-models/user";
import { generateToken } from "../../utils/generate-token";

export class CreateUserController implements IController {
    constructor(
        private repository: IRepository
    ) { }

    async handle(request: Request, response: Response): Promise<Response | undefined> {
        try {

            const { name, email, password, company, role } = request.body;

            if (name == null || name == undefined) {
                throw new BadRequestError(
                    `Empty field name`
                )
            }

            if (email == null || email == undefined) {
                throw new BadRequestError(
                    `Empty field email`
                )
            }

            if (password == null || password == undefined) {
                throw new BadRequestError(
                    `Empty field password`
                )
            }

            if (company == null || company == undefined) {
                throw new BadRequestError(
                    `Empty field company`
                )
            }

            
            if (role == null || role == undefined) {
                throw new BadRequestError(
                    `Empty field role`
                )
            }

            const user = await this.repository.createUser(request.body);

            return response.status(201).json({
                message: "User created successfully",
                token: generateToken({id: user!.id})
            })

        } catch (error) {
            console.log('Error in controller create user', error);
        }
    }
}