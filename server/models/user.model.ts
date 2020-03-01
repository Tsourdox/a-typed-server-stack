import { id } from 'mongodb-typescript';
import { ObjectId } from 'mongodb';
import { Optional } from '../types';

export interface User {
    id: ObjectId
    username: string
    password: string
}

/** A document of a user that is linked to the mongodb database model */
export class UserDocument implements User {
    @id id: ObjectId
    username: string
    password: string
    
    constructor(user: Optional<User, 'id'>) {
        // ---> ? <--- is a neat little trick so we can support ts-emitDecoratorMetadata ✅
        this.id = new ObjectId(user?.id)
        this.username = user?.username
        this.password = user?.password
    }
    
    // We can even have functions in our documents
    echo() {
        return 'Hello World - ' + this.username
    }
}
