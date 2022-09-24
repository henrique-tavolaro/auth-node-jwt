import { Request, Response } from "express";
import { Controller } from "../domain/interfaces/icontroller"
import { User } from "../domain/models/user";
import { generateToken } from "../utils/generate-token";

export class CreateUserController implements Controller {

    async handle(request: Request, response: Response): Promise<Response | undefined> {
        try {

            const { name, email, password, company } = request.body;

            if (name == null || name == undefined) {
                return response.status(403).json({
                    message: `Empty field name`
                })
            }

            if (email == null || email == undefined) {
                return response.status(403).json({
                    message: `Empty field email`
                })
            }

            if (password == null || password == undefined) {
                return response.status(403).json({
                    message: `Empty field password`
                })
            }

            if (company == null || company == undefined) {
                return response.status(403).json({
                    message: `Empty field company`
                })
            }

            if (await User.findOne({ email })) {
                return response.status(403).json({
                    message: `User alterady exists`
                })
            }

            const user = await User.create(request.body);

            return response.status(201).json({
                message: "User created successfully",
                token: generateToken({id: user.id})
            })

        } catch (error) {
            console.log('Error in controller create user', error);
            return response.status(402).json({
                message: `Error creating user: ${error}`
            })
        }
    }
}