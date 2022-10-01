

export interface UserModel {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    company: string;
    createdAt?: Date;
    deletedAt?: Date;
}