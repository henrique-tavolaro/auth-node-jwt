import { CreateCompanyController } from "../controllers/create-company";
import { IRepository } from "../../domain/repositories/i-repository";
import { Repository } from "../../infra/repositories/repository";

export const makeCreateCompanyController = () : CreateCompanyController => {
    const repository : IRepository = new Repository();
    return new CreateCompanyController(repository);
}