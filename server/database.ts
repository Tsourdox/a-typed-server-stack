import { MongoClient } from 'mongodb'

const databaseName = "mongo"
const url = 'mongodb://localhost:27017/mongo'
const settings = { useUnifiedTopology: true }

const collections = ['users']

/**
 * Will test connection with the database server and create
 * the database and all collections if they do not exist.
 */
export async function connectWithDatabase() {
    console.log('Connecting to database...')
    MongoClient.connect(url, settings, function(err, client) {
        if (err) throw err
        
        // Connect to or create the database
        var db = client.db(databaseName)
        console.log("Connection established with database: " + databaseName)
        
        // Create all collections that has been defined!
        for (const name of collections) {
            db.createCollection(name, function(err) {
                if (err) throw err
                console.log(`Collection ${name} created!`)

                // db.collection(name).insertOne({ username: 'tsourdox', password: 'beta' })
                
                client.close()
            })
        }
    })
}