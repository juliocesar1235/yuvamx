// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation

export default class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public avatar: string,
        public phoneNumber?: string,
        public dateOfBirth?: Date,
        public address?: string,
        public zipcode?: string,
        public city?: string,
        public country?: string,
        public userType?: string,
        public serviceCategory?: string,
        public serviceId?: ObjectId,
        public workScheduleAvailable?: Array<Date>,
        public workScheduleTaken?: Array<Date>,
        public bankName?: string,
        public bankAccount?: string,
        public rating?: number,
        public idProvider?: string,
        public id?: ObjectId
    ) { }
}