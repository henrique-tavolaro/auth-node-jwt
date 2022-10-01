import { IRepository } from "../../domain/repositories/i-repository";
import { Repository } from "../../infra/repositories/repository";
import { ListUsersController } from "../controllers/list-users";

export const makeListUsersController = () : ListUsersController => {
    const repository : IRepository = new Repository();
    return new ListUsersController(repository);
}