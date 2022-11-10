
import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import { env } from "./config/env";
import { router } from './main/routes/router';
import errorMiddleware from './main/middlewares/error-middleware';
import { morganMiddleware } from './main/middlewares/morgan';
import bodyParser from 'body-parser';
import morganBody from 'morgan-body';
import { authRouter } from './main/routes/auth-router';
import { auth } from './main/middlewares/auth';

const app = express();

app.use(bodyParser.json());
app.use(morganMiddleware)
morganBody(app);
app.use('/index', auth, router);
app.use(authRouter);
app.use(errorMiddleware);

const port = Number(env.PORT ?? 3000);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server started in port ${port}`)
});