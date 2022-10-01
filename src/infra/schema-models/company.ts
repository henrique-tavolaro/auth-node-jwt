import mongoose from "mongoose";


const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
})

export const Company = mongoose.model(
    "Company",
    CompanySchema)