import { RequestHandler, ErrorHandler } from './types'

/** Default server error that also contains the status */
export class ServerError extends Error {
    constructor(public status: number, public message: string) {
        super(message)
    }
}


//=====  ROUTES  =====//

export const errorMiddleware: ErrorHandler = (err, _req, res, _next) => {
    const status = err.status || 500
    console.error(err)
    res.status(status)
    res.send("Shit, something went horribly wrong.. so sorry! 👻")
}


export const notFoundMiddleware: RequestHandler<any, string> = (_req, res) => {
    res.status(404)
    res.send("I'm just here to tell you that the page do not exist, have a great day! 🦄")
}