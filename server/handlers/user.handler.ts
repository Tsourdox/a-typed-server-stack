import { UserDocument, User } from "../models/user.model";
import db from "../database";
import { ObjectId, FilterQuery } from "mongodb";
import { Updating } from "../types";
import { ServerError } from "../errors";

/** A simple crud handler for now... superclass maybe? ^^ */
class UserHandler {

    async insert(user: User): Promise<void> {
        const userDocument = new UserDocument(user)
        await db.userRepo.insert(userDocument)
    }

    async findById(id: string | ObjectId): Promise<UserDocument> {
        const userDocument = await db.userRepo.findById(new ObjectId(id))
        if (!userDocument) {
            throw new ServerError(400, 'User does not exist')
        }
        return userDocument
    }
    
    async update(user: Updating<User>): Promise<void> {
        const userDocument = await this.findById(user.id)
        if (!userDocument) {
            throw new ServerError(400, 'User does not exist')
        }
        Object.assign(userDocument, user)
        await db.userRepo.update(userDocument)
    }

    async remove(id: ObjectId | string): Promise<void> {
        const userDocument = await this.findById(id)
        if (!userDocument) {
            throw new ServerError(400, 'User does not exist')
        }
        await db.userRepo.remove(userDocument)
    }

    async find(query: FilterQuery<User>): Promise<UserDocument[]> {
        return await db.userRepo.find(query).toArray()
    }


    // private generateUsername(): string {
    //     return ['Ep0xy', 'Slajm', 'turo', 'LORD_DRACULA'][Math.floor(Math.random() * 4)]
    // }

    // private generatePassoword(length: number): string {
    //     const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890+-_?!%&*'
    //     return [...Array(length)].map(_ => charset[Math.floor(Math.random() * charset.length)]).join('')
    // }
}

export default UserHandler
