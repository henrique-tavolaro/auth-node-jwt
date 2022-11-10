import { NextFunction, Request, Response } from "express";
import { ApiErrors } from "../../domain/errors/api-errors";
import { IController } from "../../domain/interfaces/icontroller"
import { IRepository } from "../../domain/repositories/i-repository";
import { generateToken } from "../../utils/generate-token";

export class LoginUserController implements IController {

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
                user,
                token: generateToken({
                    id: user!.id,
                    role: user!.get('role')})
            })
        } catch (error) {
            console.log('Error in controller login user', error);
            next(error);
        }
    }
}
