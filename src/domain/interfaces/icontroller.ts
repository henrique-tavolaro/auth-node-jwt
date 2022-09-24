import { Request, Response } from "express";

export interface Controller<T = any> {
    handle: (request: Request, response: Response) => Promise<Response | undefined>;
}