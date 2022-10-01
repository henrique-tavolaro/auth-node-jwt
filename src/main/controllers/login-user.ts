import { NextFunction, Request, Response } from "express";
import { ApiErrors } from "../../domain/errors/api-errors";
import { BadRequestError } from "../../domain/errors/bad-request";
import { IController } from "../../domain/interfaces/icontroller"
import { IRepository } from "../../domain/repositories/i-repository";
import { generateToken } from "../../utils/generate-token";

export class LoginUserController {

    constructor(
        private repository: IRepository
    ) { }

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {

        try {

            const { email, password } = request.body;

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

            const user = await this.repository.loginUser(email, password);

       
            
            return response.status(201).json({
                user
            })
        } catch (error) {
            console.log('Error in controller login user', error);
            next(error);
        }
    }
}
