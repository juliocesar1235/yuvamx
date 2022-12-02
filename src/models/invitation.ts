// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Invitation {
    constructor(
        public contractorId: ObjectId,
        public contractorName: string,
        public allocationId: ObjectId,
        public employeeId: ObjectId,
        public employeeName: string,
        public employeePhoneNumber: string,
        public serviceId: ObjectId,
        public serviceName: string,
        public confirmedServiceDate: Date,
        public serviceTotalTime: number,
        public serviceAddress: string,
        public cost: number,
        public inviteConfirmation?: string,
        public _id?: ObjectId
    ) { }
}