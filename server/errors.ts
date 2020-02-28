import { Errback, Response } from "express"

export interface ServerError extends Errback { status: number }

export const errorMiddleware = (err: ServerError, _req: any, res: Response, _next: any) => {
    const status = err.status || 500
    console.error(err)
    res.status(status)
    res.send("Shit, something went horribly wrong.. so sorry! 👻")
}

export const notFoundMiddleware = (_: any, res: Response) => {
    res.status(404)
    res.send("I'm just here to tell you that the page do not exist, have a great day! 🦄")
}