import { NextFunction, Request, Response } from "express";

export interface IController<T = any> {
    handle: (request: Request, response: Response, next: NextFunction) => Promise<Response | undefined>;
}