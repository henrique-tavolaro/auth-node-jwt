import { NextFunction, Request, Response } from "express";
import { ApiErrors } from "../../domain/errors/api-errors";

export default function errorMiddleware(
    err: Error,
    _request: Request,
    response: Response,
    _next: NextFunction
) {
    if (err instanceof ApiErrors) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }
    response.status(404).json({
        message: err.message
    })
}