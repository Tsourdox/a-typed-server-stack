import express from 'express'
import { connectWithDatabase } from './database'

// Express server settings
const app = express()
const host = 'localhost'
const port = 4000

/** Keeps track on all visitors */
let count = 0

//======  Defined Routes  ======//
// Counting middleware
app.get('/', (...[, , next]) => {
    console.log('Someone asked to view the home page ^^, visitor: ', ++count)
    next()
})

// Serve public folder
app.use(express.static('public'))

// 404 page
app.use((...[, res]) => res.status(404).send(
    "I'm just here to tell you that the page does not exist, have a great day ^^"
))


//======  Spin up the server!  ======//
app.listen(port, host, () => {
    console.log(`Sever is listening on http://${host}:${port}`)
    
    try {
        connectWithDatabase()
    } catch(err) {
        console.error(err)
    }
})