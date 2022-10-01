import morgan from "morgan";
import clc from "cli-color";

export const morganMiddleware = morgan(

  (tokens, req, res) => {

    const date = new Date().toISOString()

    return [

      clc.greenBright(date),
      "-",
      clc.green(tokens.method(req, res)),
      clc.yellow(tokens.url(req, res)),
      "-",
      clc.cyan(tokens.status(req, res)),
      clc.magenta(`${tokens["response-time"](req, res)} ms \n`),

    ].join(" ");
  },
  {
    stream: {
      write: (message) => {
        console.log(message.replace(/\n/gi, ""));
      },
    },
  },
);