// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Allocation {
    constructor(
        public contractorId: ObjectId,
        public serviceId: ObjectId,
        public serviceName: string,
        public confirmedServiceDate: Date,
        public completedServiceTotalTime: number,
        public serviceAddress: string,
        public serviceStatus: string,
        public cost: number,
        public rating?: number,
        public favorite?: boolean,
        public tentativeEmployeeId?: ObjectId,
        public confirmedEmployeeId?: ObjectId,
        public rejectedEmployees?: Array<ObjectId>,
        public id?: ObjectId
    ) { }
}