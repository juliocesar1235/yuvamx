// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation

export default class Service {
    constructor(
        public name: string,
        public desc: string,
        public media: object,
        public totalOfEmployees: number,
        public averageServiceTime: number,
        public cost: number,
        public id?: ObjectId
    ) { }
}