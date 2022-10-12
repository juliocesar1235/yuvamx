// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation

export default class Message {
    constructor(
        public conversationId: ObjectId,
        public authorId: ObjectId,
        public authorName: string,
        public message: string,
        public id?: ObjectId
    ) { }
}