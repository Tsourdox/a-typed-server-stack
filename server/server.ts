import express from 'express'
require('express-async-errors') // so we can have async middlewares ^^

// import { incrementVisitors, getVisitors } from './handlers/metaHandler'
import db from './database'
import UserHandler from './handlers/user.handler'
import { errorMiddleware, notFoundMiddleware } from './errors'

// Express server settings
const app = express()
const host = 'localhost'
const port = 4000

//======  Defined Routes  ======//

/* Reactions on every get request */
app.get('/', async (_req, _res, next) => {
    if (Math.round(Math.random())) {
        throw new Error()
    }
    // let count = await getVisitors()
    // console.log('Someone asked to view the home page ^^, visitor: ', ++count)
    // incrementVisitors()

    // Try mongodb-typescript code
    await new UserHandler().testRepo()

    next()
})

/* Hook up API endpoints */
// TODO: app.use(api)

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