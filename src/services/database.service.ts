// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { allocationValidator, servicesValidator, usersValidator } from "./schema.validators";

// Global Variables
export const collections: {
    services?: mongoDB.Collection,
    users?: mongoDB.Collection,
    allocations?: mongoDB.Collection,
    invitations?: mongoDB.Collection,
} = {}

// Initialize Connection
export async function connectToDatabase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    await db.command(servicesValidator);
    await db.command(usersValidator);
    await db.command(allocationValidator);

    const servicesCollection: mongoDB.Collection = db.collection('services');
    const usersCollection: mongoDB.Collection = db.collection('users');
    const allocationsCollection: mongoDB.Collection = db.collection('allocations');
    const invitations: mongoDB.Collection = db.collection('invitations');

    collections.services = servicesCollection;
    collections.users = usersCollection;
    collections.allocations = allocationsCollection;
    collections.invitations = invitations;

    console.log(`Successfully connected to database: ${db.databaseName} and collections: 
    ${servicesCollection.collectionName}, 
    ${usersCollection.collectionName}, 
    ${allocationsCollection.collectionName},
    ${invitations.collectionName}`);
}