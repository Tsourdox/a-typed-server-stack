import { MongoClient, Db, Collection } from 'mongodb'

class DatabaseController {
    private databaseName = "mongo"
    private url = 'mongodb://localhost:27017/mongo'
    private options = { useUnifiedTopology: true }
    private database!: Db
    private collections: string[]

    constructor(collections: string[]) {
        this.collections = collections
    }

    /** returns a mongodb collection object */
    public collection(name: string): Collection {
        return this.database.collection(name)
    }

    /**
     * This function should be called once when the server starts.
     * It connects to the database and creates missing collections.
     */
    public async connect(): Promise<void> {
        console.log('\nConnecting to database...')
        try {
            // Connect to or create the database if not present
            const client = new MongoClient(this.url, this.options)
            const connection = await client.connect()
            this.database = connection.db(this.databaseName)
            console.log(`Connection established with database: "${this.databaseName}"`)
    
            // Create collections if not present
            await this.createCollections()
        } catch(err) {
            throw err
        }
    }

    /** Create all missing collections */
    private async createCollections() {
        console.log('\nChecking collections...')
        if (this.database) {
            for (const name of this.collections) {
                await this.database.createCollection(name)
                console.log(`"${name}"`, '✅')
            }
        }
    }
}

/** Like a singleton because same class instance is exported */
export default new DatabaseController(['users', 'meta'])