import express from 'express'
import helmet from 'helmet'
import { ObjectId } from 'mongodb'
require('express-async-errors') // so we can have async middlewares ^^

// import { incrementVisitors, getVisitors } from './handlers/metaHandler'
import db from './database'
import UserHandler from './handlers/user.handler'
import { errorMiddleware, notFoundMiddleware } from './errors'
import api from './api/api'

// Express server settings
const app = express()
const host = 'localhost'
const port = 4000

// Use helmet for some default security
app.use(helmet())

//======  Defined Routes  ======//

/* Reactions on every get request */
app.get('/', async (_req, _res, next) => {
    // let count = await getVisitors()
    // console.log('Someone asked to view the home page ^^, visitor: ', ++count)
    // incrementVisitors()

    await new UserHandler().update({ id: new ObjectId('5e5305dfd2a60e7d84b1032f'), username: 'david', password: 'haxxed' })

    next()
})

/* Hook up API endpoints */
app.use('/api', api)

/* Serve public folder */
app.use(express.static('public'))

/* Hook up 404 page */
app.use(notFoundMiddleware)

/* Hook up the error handler last in the chain! */
app.use(errorMiddleware)


//======  Spin up the server!  ======//
;(async () => {
    try {
        // Establish a db connection - then start the server
        await db.connect()
        app.listen(port, host, serverIsListening)
    } catch(err) {
        console.error("BootError: server could not start", err)
    }
})()

/** Callback on server start */
function serverIsListening() {
    console.log(`\nSever is listening on http://${host}:${port}\n`)
}