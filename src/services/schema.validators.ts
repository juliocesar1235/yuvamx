export const servicesValidator = {
    "collMod": 'services',
    "validator": {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "desc", "media", "totalOfEmployees", "averageServiceTime"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string"
                },
                desc: {
                    bsonType: "string",
                    description: "'desc' is required and is a string"
                },
                media: {
                    bsonType: "object",
                    description: "'media' is required and is a object"
                },
                totalOfEmployees: {
                    bsonType: "number",
                    description: "'totalOfEmployees' is required and is a number"
                },
                averageServiceTime: {
                    bsonType: "number",
                    description: "'averageServiceTime' is required and is a number"
                },
                cost: {
                    bsonType: "double",
                    description: "'cost' is required and is a double"
                }
            }
        }
    }
}

export const usersValidator = {
    "collMod": 'users',
    "validator": {
        $jsonSchema: {
            bsonType: "object",
            required: ["firstName", "lastName", "email"],
            additionalProperties: false,
            properties: {
                _id: {},
                firstName: {
                    bsonType: "string",
                    description: "'firstName' is required and is a string"
                },
                lastName: {
                    bsonType: "string",
                    description: "'lastName' is required and is a string"
                },
                email: {
                    bsonType: "string",
                    description: "'email' is required and is a string"
                },
                firebaseID: {
                    bsonType: "string",
                    description: "'firebaseID' is required and is a string"
                },
                phoneNumber: {
                    bsonType: "string",
                    description: "'string' is required and is a string"
                },
                dateOfBirth: {
                    bsonType: "date",
                    description: "'totalOfEmployees' is required and is a date"
                },
                avatar: {
                    bsonType: "string",
                    description: "'avatar' is required and is a string"
                },
                address: {
                    bsonType: "string",
                    description: "'address' is required and is a string"
                },
                zipcode: {
                    bsonType: "string",
                    description: "'zipcode' is required and is a string"
                },
                city: {
                    bsonType: "string",
                    description: "'city' is required and is a string"
                },
                country: {
                    bsonType: "string",
                    description: "'country' is required and is a string"
                },
                userType: {
                    bsonType: "string",
                    description: "'userType' is required and is a string"
                },
                serviceCategory: {
                    bsonType: "string",
                    description: "'serviceCategory' is required and is a string"
                },
                serviceId: {
                    bsonType: "objectId",
                    description: "'serviceId' is required and is a objectId"
                },
                workScheduleAvailable: {
                    bsonType: "array",
                    description: "'workScheduleAvailable' is required and is a object",
                    maxItems: 25,
                    items: {
                        bsonType: "date"
                    }
                },
                workScheduleTaken: {
                    bsonType: "array",
                    description: "'workScheduleTaken' is required and is a object",
                    maxItems: 25,
                    items: {
                        bsonType: "date"
                    }
                },
                bankName: {
                    bsonType: "string",
                    description: "'bankName' is required and is a string"
                },
                bankAccount: {
                    bsonType: "string",
                    description: "'bankAccount' is required and is a string"
                },
                rating: {
                    bsonType: "double",
                    description: "'rating' is required and is a string"
                },
                favoriteServices: {
                    bsonType: "array",
                    description: "'favorites' is optional and is an array",
                    items: {
                        bsonType: "string"
                    }
                },
            }
        }
    }
}


export const allocationValidator = {
    "collMod": 'allocations',
    "validator": {
        $jsonSchema: {
            bsonType: "object",
            required: ["contractorId", "serviceId", "serviceName", "confirmedServiceDate", "completedServiceTotalTime", "serviceAddress", "serviceStatus", "cost"],
            additionalProperties: false,
            properties: {
                _id: {},
                contractorId: {
                    bsonType: "objectId",
                    description: "'contractorId' is required and is a objectId"
                },
                serviceId: {
                    bsonType: "objectId",
                    description: "'serviceId' is required and is a objectId"
                },
                serviceName: {
                    bsonType: "string",
                    description: "'serviceName' is required and is a string"
                },
                confirmedServiceDate: {
                    bsonType: "date",
                    description: "'confirmedServiceDate' is required and is a date"
                },
                completedServiceTotalTime: {
                    bsonType: "int",
                    description: "'completedServiceTotalTime' is required and is a int"
                },
                serviceAddress: {
                    bsonType: "string",
                    description: "'serviceAddress' is required and is a string"
                },
                serviceStatus: {
                    bsonType: "string",
                    description: "'serviceStatus' is required and is a string"
                },
                rating: {
                    bsonType: "double",
                    description: "'rating' is required and is a double"
                },
                cost: {
                    bsonType: "number",
                    description: "'cost' is required and is a number"
                },
                favorite: {
                    bsonType: "bool",
                    description: "'favorite' is required and is a bool"
                },
                tentativeEmployeeId: {
                    bsonType: "objectId",
                    description: "'tentativeEmployeeId' is required and is a objectId"
                },
                confirmedEmployeeId: {
                    bsonType: "objectId",
                    description: "'confirmedEmployeeId?' is required and is a objectId"
                },
                rejectedEmployees: {
                    bsonType: "array",
                    description: "'rejectedEmployees' is required and is a array",
                    maxItems: 25,
                    items: {
                        bsonType: "objectId"
                    }
                },
            }
        }
    }
}