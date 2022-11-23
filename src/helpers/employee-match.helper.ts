import { ObjectID } from "bson";
import User from "../models/user";
import { collections } from "../services/database.service";
import twilio from "twilio"

const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN;

export async function findTentativeEmployee(scheduleBlock: Date, rejectedFilter: Array<ObjectID>) {
    const tentativeEmployeeId = await collections.users.findOne<User>(
        {
            id: { $not: { $in: rejectedFilter } },
            "workScheduleAvailable": scheduleBlock,
        }
    )
    const smsClient = twilio(TWILIO_SID, TWILIO_TOKEN);

    smsClient.messages.create({
        body: "hello from yuva",
        to: "+528181383038",
        from: "+15738892569"
    }).then((message) => console.log(message.sid));

    return tentativeEmployeeId;
}