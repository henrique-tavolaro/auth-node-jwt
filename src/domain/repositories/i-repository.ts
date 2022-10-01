import { Document } from 'mongoose';
import { CompanyModel } from '../models/company-model'
import { UserModel } from '../models/user-model';


export interface IRepository {

    createCompany(company: CompanyModel): Promise<Document | null>;
    createUser(user: UserModel): Promise<Document | null>;
    deleteCompany(id: string): Promise<Document | null>;
    deleteUser(id: string): Promise<Document | null>;
    listCompanies(): Promise<CompanyModel[] | null>
    listUsers(): Promise<UserModel[] | null>
    loginUser(email: string, password: string): Promise<Document | undefined>
}