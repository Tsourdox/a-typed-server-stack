import { id } from 'mongodb-typescript';
import { ObjectId } from 'mongodb';

interface User {
    username: string
    password: string
}

export class UserDocument implements User {
    @id id: ObjectId
    username!: string
    password!: string
    
    constructor(props: User) {
        this.id = new ObjectId()
        this.username = props?.username as string
        this.password = props?.password as string
    }
    
    hello() {
        return 'Hello World - ' + this.username
    }
}
