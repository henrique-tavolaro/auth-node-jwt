import { mongoose } from "../datasource/datasource";
import bcrypt from "bcryptjs"

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
        role:{
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        deletedAt: {
            type: Date,
            default: null
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



