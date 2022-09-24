import mongoose from "mongoose";
import { env } from "../../config/env";

mongoose.connect(env.MONGO_URL!)
mongoose.Promise = global.Promise;

export {mongoose};
