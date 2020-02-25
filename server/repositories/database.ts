import { Repository } from 'mongodb-typescript';
import { MongoClient } from "mongodb";
import { UserDocument } from './user';

/** Connects to database and also defines and exposes all available repositories */
class DatabaseController {
    private client: MongoClient
    private dbName = "mongo"
    private url = `mongodb://localhost:27017/${this.dbName}`
    private options = { useUnifiedTopology: true }
    
    private userRepository!: Repository<UserDocument>
    // Add more repositories if needed
    
    constructor() {
        this.client = new MongoClient(this.url, this.options)
    }

    /**
     * This function should be called once when the server starts.
     * It will attempt to connect to the database.
     */
    public async connect(): Promise<void> {
        console.log('\nConnecting to database...')
        try {
            // Will create the database if not present
            await this.client.connect()
            console.log(`Connection established with database: "${this.dbName}"`)
    
            this.initRepositories()
        } catch(err) {
            throw err
        }
    }

    /** Will create all needed collections in the database */
    private initRepositories() {
        this.userRepository = new Repository<UserDocument>(UserDocument, this.client, 'users');
        // Add more repositories if needed
    }

    public get Client() { return this.client}

    public get userRepo() { return this.userRepository }
    // Add more repositories if needed

}

const db = new DatabaseController()
export default db