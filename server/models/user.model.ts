import { id } from 'mongodb-typescript';
import { ObjectId } from 'mongodb';

interface User {
    username: string
    password: string
}

/** A document that is linked to the mongodb database model */
export class UserDocument implements User {
    @id id: ObjectId
    username: string
    password: string
    
    constructor(user: User) {
        this.id = new ObjectId()
        
        // ---> ? <--- is a neat little trick so we can support ts-emitDecoratorMetadata ✅
        this.username = user?.username
        this.password = user?.password
    }
    
    // We can even have functions in our documents
    echo() {
        return 'Hello World - ' + this.username
    }
}
