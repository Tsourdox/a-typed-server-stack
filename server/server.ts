import express from 'express'
import { connectWithDatabase } from './database'

// Express server settings
const app = express()
const host = 'localhost'
const port = 4000

/** Keeps track on all visitors */
let count = 0

// Defined Routes
app.get('/', (...[, , next]) => {
    console.log('Someone asked to view the home page ^^, visitor: ', ++count)
    next()
})
app.use(express.static('public'))



// Spin up the server!
app.listen(port, host, () => {
    console.log(`Sever is listening on http://${host}:${port}`)
    
    try {
        connectWithDatabase()
    } catch(err) {
        console.error(err)
    }
})