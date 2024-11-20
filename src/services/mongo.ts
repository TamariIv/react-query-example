import { MongoClient, ObjectId } from "mongodb";

export async function connectDatabase() {
    const dbConnection: any = process.env.PUBLIC_DB_CONNECTION;
    console. log("---------------", dbConnection);
    return await MongoClient.connect(dbConnection);
}


export async function insertDocument(client: any, collection: string, document: object) {
    const db = client.db('db01');
    const result = await db.collection(collection).insertOne(document);
    return result;
}


export async function getAllDocuments(client: any, collection: string) {
    const db = client.db('db01');
    const documents = await db.collection(collection).find().toArray();
    return documents;
}


export async function updateDocument(client: any, collection: string, filter: object, update: object) {
    const db = client.db('db01');
    const result = await db.collection(collection).updateOne(filter, { $set: update });
    return result;
}


export async function deleteDocument(client: any, collection: string, filter: object) {
    const db = client.db('db01');
    const result = await db.collection(collection).deleteOne(filter);
    return result;
}

