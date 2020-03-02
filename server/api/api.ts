import { Router } from 'express'
import bodyParser from 'body-parser'
import user from './user.api'
import { ErrorHandler } from '../types'

const api = Router()

// parse incoming data as json code
api.use(bodyParser.json())

// all api routes
api.use('/users', user)


// Hook up error handling for the api
const apiErrorHandler: ErrorHandler = (err, _req, res, next) => {
    if (err.status && err.status < 500) {
        console.error(err) // Do we need to log 
        res.status(err.status).send(err.message)
    } else {
        console.error('APIError: An error in the API was not caught properly')
        next(err)
    }
}
api.use(apiErrorHandler)


export default api