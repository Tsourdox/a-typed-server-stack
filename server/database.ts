import { MongoClient, Db } from 'mongodb'

const databaseName = "mongo"
const url = 'mongodb://localhost:27017/mongo'
const options = { useUnifiedTopology: true }

const collections = ['users', 'meta']
let db: Db

/**
 * Will test connection with the database server and create
 * the database and all collections if they do not exist.
 */
export async function connectWithDatabase() {
    console.log('\nConnecting to database...')
    try {
        // Connect to or create the database if not present
        const client = await new MongoClient(url, options)
        const connection = await client.connect()
        db = await connection.db(databaseName)
        console.log(`Connection established with database: "${databaseName}"`)

        // Create collections if not present
        createCollections()

    } catch(err) {
        throw err
    }
}

/** Create all missing collections */
async function createCollections() {
    console.log('\nChecking collections...')
    for (const name of collections) {
        await db.createCollection(name)
        console.log(`"${name}"\t ✅`)
    }
}

// export async function insert() {
//     await db.collection(name).insertOne({ username: 'tsourdox', password: 'beta' })
// }