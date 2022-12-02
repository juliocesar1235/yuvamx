import { ObjectID } from "bson";
import User from "../models/user";
import { collections } from "../services/database.service";
import twilio from "twilio"
import Allocation from "../models/allocation";
// force deploy
const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN;

export async function findTentativeEmployee(allocation: Allocation) {
    const tentativeEmployee = await collections.users.findOne<User>(
        {
            id: { $not: { $in: allocation.rejectedEmployees } },
            workScheduleTaken: { $ne: allocation.confirmedServiceDate }
        }
    )
    if (tentativeEmployee) {
        const contractor = await collections.users.findOne<User>({ _id: allocation.contractorId });
        console.log(allocation._id, 'match')
        const invitation = await collections.invitations.insertOne({
            contractorId: allocation.contractorId,
            contractorName: contractor.firstName + " " + contractor.lastName,
            allocationId: allocation._id,
            employeeId: tentativeEmployee._id,
            employeeName: tentativeEmployee.firstName + " " + tentativeEmployee.lastName,
            employeePhoneNumber: tentativeEmployee.phoneNumber,
            serviceId: allocation.serviceId,
            serviceName: allocation.serviceName,
            confirmedServiceDate: allocation.confirmedServiceDate,
            serviceTotalTime: allocation.completedServiceTotalTime,
            serviceAddress: allocation.serviceAddress,
            cost: allocation.cost
        })
        const smsClient = twilio(TWILIO_SID, TWILIO_TOKEN);

        // smsClient.messages.create({
        //     body: "hello from yuva http://localhost:4200/invitation/" + invitation.insertedId,
        //     to: "+528181383038",
        //     from: "+15738892569"
        // }).then((message) => console.log(message.sid));
    }
    return tentativeEmployee;
}