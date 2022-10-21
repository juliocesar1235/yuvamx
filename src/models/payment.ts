// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
// not final, expected to change

export default class Payment {
    constructor(
        public paymentMethod: string,
        public amount: number,
        public currency: string,
        public userId: ObjectId,
        public allocationId: ObjectId,
        public serviceName: string,
        public id?: ObjectId
    ) { }
}