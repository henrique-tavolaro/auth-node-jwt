import { Request, Response } from "express";
import { BadRequestError } from "../../domain/errors/bad-request";
import { IController } from "../../domain/interfaces/icontroller";
import { IRepository } from "../../domain/repositories/i-repository";

export class DeleteUserController implements IController {
    constructor(
        private repository: IRepository
    ) { }

    async handle(request: Request, response: Response): Promise<Response | undefined> {
        try {
            const _id = request.body;

            if (_id == null || _id == undefined) {
                throw new BadRequestError(
                    `No user id provided`
                )
            }

            await this.repository.deleteUser(_id);

            return response.status(201).json({ message: "User deleted successfully" })

        } catch (error) {
            console.log('Error in controller delete user', error);
        }
    }
}