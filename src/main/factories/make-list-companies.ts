import { IRepository } from "../../domain/repositories/i-repository";
import { Repository } from "../../infra/repositories/repository";
import { ListCompaniesController } from "../controllers/list-companies";

export const makeListCompaniesController = () : ListCompaniesController => {
    const repository : IRepository = new Repository();
    return new ListCompaniesController(repository);
}