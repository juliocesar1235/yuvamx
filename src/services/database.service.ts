// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { servicesValidator, usersValidator } from "./schema.validators";

// Global Variables
export const collections: {
    services?: mongoDB.Collection,
    users?: mongoDB.Collection
} = {}

// Initialize Connection
export async function connectToDatabase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    await db.command(servicesValidator);
    await db.command(usersValidator);

    const servicesCollection: mongoDB.Collection = db.collection('services');
    const usersCollection: mongoDB.Collection = db.collection('users')

    collections.services = servicesCollection;
    collections.users = usersCollection

    console.log(`Successfully connected to database: ${db.databaseName} and collections: ${servicesCollection.collectionName}, ${usersCollection.collectionName}`);
}