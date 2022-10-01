import { Request, Response } from "express";
import { IController } from "../../domain/interfaces/icontroller";
import { IRepository } from "../../domain/repositories/i-repository";

export class ListUsersController implements IController {

    constructor(
        private repository: IRepository
    ) { }
    
    async handle(request: Request, response: Response): Promise<Response | undefined> {
        try {

            const result = await this.repository.listUsers();
          
            return response.status(201).json({data: result})

        } catch (error) {
            console.log('Error in controller list users', error);
        }
    
    }
    
}