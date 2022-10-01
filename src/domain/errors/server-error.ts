export class ServerError extends Error {
    constructor(
      public message: string,
    ) {
      super(message);
    }

    status = 500;
  }