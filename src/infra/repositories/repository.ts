import { Document } from "mongoose";
import { CompanyModel } from "../../domain/models/company-model";
import { UserModel } from "../../domain/models/user-model";
import { IRepository } from "../../domain/repositories/i-repository";
import { Company } from "../schema-models/company";
import { User } from "../schema-models/user";
import bcrypt from 'bcryptjs';
import { ApiErrors } from "../../domain/errors/api-errors";

export class Repository implements IRepository {
    async createCompany(company: CompanyModel): Promise<Document | null> {
        try {
            const name = company.name;
            if (await Company.findOne({ name })) {
                throw ApiErrors.badRequest(`Company already exists`)
            }

            const result = await Company.create(company);
            if (!result) {
                throw ApiErrors.serverError('Error creating company')
            }

            return result;
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async createUser(user: UserModel): Promise<Document | null> {
        try {
            const email = user.email;
            if (await User.findOne({ email })) {
                throw ApiErrors.badRequest(`User already exists`)
            }

            const newUser = await User.create(user);

            console.log(`NEW USER ${newUser}`)

            if (!newUser) {
                throw ApiErrors.serverError('Error creating user')
            }

            return newUser;
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async deleteCompany(id: string): Promise<Document | null> {
        try {
            const today: Date = new Date();

            const result = await Company.findOneAndUpdate({ _id: id }, { deletedAt: today })

            if (!result) {
                throw ApiErrors.badRequest(`Company not found`)
            }

            if (result.deletedAt != null) {
                throw ApiErrors.badRequest(`Company already exists`)
            }

            return result;
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async deleteUser(id: string): Promise<Document | null> {
        try {
            const today: Date = new Date();

            const result = await User.findOneAndUpdate({ _id: id }, { deletedAt: today })

            if (!result) {
                throw ApiErrors.badRequest(`User not found`)
            }

            if (result.deletedAt != null) {
                throw ApiErrors.badRequest(`User already deleted`)
            }

            return result;
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async listCompanies(): Promise<CompanyModel[] | null> {
        try {
            const result = await Company.find().where('deletedAt').equals(null);

            return result as CompanyModel[];
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async listUsers(): Promise<UserModel[] | null> {
        try {
            const result = await User.find().where('deletedAt').equals(null);

            return result as UserModel[];
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async loginUser(email: string, password: string): Promise<Document | undefined> {
        try {
            const user = await User.findOne({ email }).select('+password');

            if (!user || user.deletedAt != null) {
                throw ApiErrors.badRequest(`User not found`)
            }


            if (!await bcrypt.compare(password, user.password)) {
                throw ApiErrors.badRequest(`Invalid password`)
            }

            user.password = '';

            return user;

        } catch (err) {
            console.log(err); 
            throw err;
        }
    }
}

interface ILoginUserParams {
    email: string;
    password: string;
}