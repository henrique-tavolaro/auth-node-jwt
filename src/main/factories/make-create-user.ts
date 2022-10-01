import { CreateUserController } from "../controllers/create-user";
import { IRepository } from "../../domain/repositories/i-repository";
import { Repository } from "../../infra/repositories/repository";

export const makeCreateUserController = () : CreateUserController => {
    const repository : IRepository = new Repository();
    return new CreateUserController(repository);
}