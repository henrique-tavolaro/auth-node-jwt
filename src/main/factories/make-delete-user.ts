import { IRepository } from "../../domain/repositories/i-repository";
import { Repository } from "../../infra/repositories/repository";
import { DeleteUserController } from "../controllers/delete-user";

export const makeDeleteUserController = () : DeleteUserController => {
    const repository : IRepository = new Repository();
    return new DeleteUserController(repository);
}