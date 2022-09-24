import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import { env } from "./config/env";
import { router } from './main/routes/router';

const app = express();

app.use(express.json());    

app.use(router);

const port = Number(env.PORT ?? 3000);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server started in port ${port}`)
});