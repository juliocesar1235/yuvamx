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
            _id: { $not: { $in: allocation.rejectedEmployees } },
            workScheduleTaken: { $ne: allocation.confirmedServiceDate },
            userType: "employee"
        }
    )
    console.log(tentativeEmployee, 'tentative');
    if (tentativeEmployee) {
        const contractor = await collections.users.findOne<User>({ _id: allocation.contractorId });
        const allocationUpdate = await collections.allocations.updateOne({ _id: allocation._id }, { $set: { tentativeEmployeeId: tentativeEmployee._id } });
        console.log(allocationUpdate, 'Updated allocation for tentative employee');
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
        console.log(invitation, 'created invitation');
        const smsClient = twilio(TWILIO_SID, TWILIO_TOKEN);
        console.log('sending invitation...');
        smsClient.messages.create({
            body: "Un nuevo servicio solicitado, ¿te gustaría aceptarlo? http://localhost:4200/invitation/" + invitation.insertedId,
            to: tentativeEmployee.phoneNumber.length === 10 ? "+528181383038" : "+52" + tentativeEmployee.phoneNumber,
            from: "+15738892569"
        }).then((message) => console.log('invitation send' + message.sid));

    }
    return tentativeEmployee;
}