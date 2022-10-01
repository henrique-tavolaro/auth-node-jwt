export class ApiErrors extends Error{
    constructor(
        public statusCode: number,
        public message: string
    ) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }

    static badRequest(message: string) {
        return new ApiErrors(400, message)
    }

    static serverError(message: string){
        return new ApiErrors(500, message)
    }

    static unauthorizedError(message: string){
        return new ApiErrors(401, message)
    }

}