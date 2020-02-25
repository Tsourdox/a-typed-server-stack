import { UserDocument } from "../repositories/user";
import db from "../repositories/database";

export async function testRepo() {
    try {
        // create new user entity (MongoDB document)
        const user = new UserDocument({ username: 'Jensen', password: 'test' });
        await db.userRepo.insert(user)
        console.log(user)
        
        // now let's retrieve entity from database
        const retrievedUser = await db.userRepo.findById(user.id)
        console.log(retrievedUser?.hello())
        
    } catch (error) {
        console.log('ooooops', error)
    }

}