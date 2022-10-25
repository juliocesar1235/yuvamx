// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
//TODO: service cost property
export default class Allocation {
    constructor(
        public contractorId: ObjectId,
        public employeeId: ObjectId,
        public serviceId: ObjectId,
        public serviceName: string,
        public confirmedServiceDate: Date,
        public completedServiceTotalTime: number,
        public serviceAddress: string,
        public serviceStatus: string,
        public rating: number,
        public favorite: boolean,
        public id?: ObjectId
    ) { }
}