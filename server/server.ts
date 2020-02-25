import express from 'express'
// import { incrementVisitors, getVisitors } from './handlers/metaHandler'
import db from './repositories/database'
import { testRepo } from './handlers/user.handler'

// Express server settings
const app = express()
const host = 'localhost'
const port = 4000

/** Keeps track on all visitors */

//======  Defined Routes  ======//
// Counting middleware
app.get('/', async (_req, _res, next) => {
    // let count = await getVisitors()
    // console.log('Someone asked to view the home page ^^, visitor: ', ++count)
    // incrementVisitors()

    // Try mongodb-typescript code
    testRepo()

    next()
})

// Serve public folder
app.use(express.static('public'))

// 404 page
app.use((_req, res) => res.status(404).send(
    "I'm just here to tell you that the page do not exist, have a great day! 🦄"
))


//======  Spin up the server!  ======//
async function run() {
    try {
        await db.connect()
        app.listen(port, host, () => {
            console.log(`\nSever is listening on http://${host}:${port}\n`)
        })
    } catch(err) {
        console.error(err)
    }
}
run()