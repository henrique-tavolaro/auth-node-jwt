import { IRepository } from "../../domain/repositories/i-repository";
import { Repository } from "../../infra/repositories/repository";
import { LoginUserController } from "../controllers/login-user";

export const makeLoginUserController = () : LoginUserController => {
    const repository : IRepository = new Repository();
    return new LoginUserController(repository);
}