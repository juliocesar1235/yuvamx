// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation

export default class Conversation {
    constructor(
        public contractorId: ObjectId,
        public employeeId: ObjectId,
        public id?: ObjectId
    ) { }
}