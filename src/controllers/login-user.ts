import { Request, Response } from "express";
import { Controller } from "../domain/interfaces/icontroller"
import { User } from "../domain/models/user";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/generate-token";

export class LoginUserController implements Controller {

    async handle(request: Request, response: Response): Promise<Response | undefined> {
        try {

            const { email, password } = request.body;

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

            const user = await User.findOne({ email }).select('+password');

            if(!user){
                return response.status(405).json({
                    message: `User not found`
                })
            }

            if(!await bcrypt.compare(password, user.password)){
                return response.status(405).json({
                    message: `Invalid password`
                })
            }

            user.delete(password);

            return response.status(201).json({
                user, 
                token: generateToken({id: user.id})
            })

        } catch (error) {
            console.log('Error in controller login user', error);
            return response.status(402).json({
                message: `Error login user: ${error}`
            })
        }
    }
}