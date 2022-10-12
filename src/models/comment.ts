// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation

export default class Comment {
    constructor(
        public userId: ObjectId,
        public userName: string,
        public userType: string,
        public allocationId: ObjectId,
        public comment: string,
        public id?: ObjectId
    ) { }
}