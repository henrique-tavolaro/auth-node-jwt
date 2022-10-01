import { IRepository } from "../../domain/repositories/i-repository";
import { Repository } from "../../infra/repositories/repository";
import { DeleteCompanyController } from "../controllers/delete-company";

export const makeDeleteCompanyController = () : DeleteCompanyController  => {
    const repository : IRepository = new Repository();
    return new DeleteCompanyController(repository);
}