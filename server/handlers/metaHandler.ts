import db from "../database";
import { ObjectId } from "mongodb";

interface MetaDocument {
    _id?: ObjectId
    visitors: number
}

async function getMetaDocument() {
    const collection = db.collection('meta')
    return (await collection.find<MetaDocument | undefined>({}).limit(1).toArray())[0]
}

export async function incrementVisitors() {
    const collection = db.collection('meta')
    
    
    let document = await getMetaDocument()
    if (document) {
        document.visitors++
        collection.updateOne({ _id: document._id }, { '$set': document }) 
    } else {
        document = { visitors: 1 }
        collection.insertOne(document)
    }
    
}

export async function getVisitors(): Promise<number> {
    const doc = await getMetaDocument()
    return doc?.visitors || 0
}

