import { UserDocument } from "../models/user.model";
import db from "../database";

/** A simple handler for now...  */
class UserHandler {
    
    async testRepo() {
        try {
            // Generate a random person and password
            const username = this.generateUsername()
            const password = this.generatePassoword(12)
            
            // create new user entity (MongoDB document)
            const user = new UserDocument({ username, password });
            await db.userRepo.insert(user)
            console.log(user)
            
            // now let's retrieve entity from database
            const retrievedUser = await db.userRepo.findById(user.id)
            console.log(retrievedUser?.echo())
            
        } catch (error) {
            console.log('ooooops', error)
        }
    }

    generateUsername(): string {
        return ['Ep0xy', 'Slajm', 'turo', 'LORD_DRACULA'][Math.floor(Math.random() * 4)]
    }

    generatePassoword(length: number): string {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890+-_?!%&*'
        return [...Array(length)].map(_ => charset[Math.floor(Math.random() * charset.length)]).join('')
    }
}

export default UserHandler
