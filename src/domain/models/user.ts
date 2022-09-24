import { mongoose } from "../../infra/datasource/datasource";
import bcrypt from "bcryptjs"
import { Schema } from "mongoose";

const UserSchema =
    new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        company: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    })

    UserSchema.pre('save', async function(next) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;

        next();
    })

export const User = mongoose.model(
    "User",
    UserSchema)



