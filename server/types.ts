import { Request, Response, NextFunction, Params } from 'express-serve-static-core'
import { ObjectId } from 'mongodb';
import { ServerError } from './errors';

export interface Document {
    id: ObjectId | string
}

/** An easy to use error request handler */
export type ErrorHandler = (
    err: ServerError,
    req: Request<any, string, any>,
    res: Response<string>,
    next: NextFunction
) => void;


/** An easy to use request handler */
export type RequestHandler<ReqBody, ResBody, P extends Params = {}> = (
    req: Request<P, ResBody, ReqBody>,
    res: Response<ResBody>,
    next: NextFunction
) => void;

/** An easy to use partial type where all properies but id a made optional - used when updating data */
export type Updating<T extends { id: ObjectId }> = Partial<T> & { id: ObjectId }

/** An easy to use partial type where id is made optional - useful as constuctor type where id should be optional */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>