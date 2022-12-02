// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Invitation from "../models/invitation";

// Global Config
export const invitationRouter = express.Router();

invitationRouter.use(express.json());

// GET
invitationRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const invitations: Invitation[] = (await collections.invitations.find<Invitation>({}).toArray());
        console.log(`Invitations retrieved successfully, total of invitations: ${invitations.length}`)

        res.status(200).send(invitations);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

invitationRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {

        const query = { _id: new ObjectId(id) };
        const invitation = (await collections.invitations.findOne<Invitation>(query)) as Invitation;
        console.log('Invitation find', invitation)

        if (invitation) {
            console.log(`invitation data send: ${invitation._id}`)
            res.status(200).send(invitation);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST
invitationRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newInvitation = req.body as Invitation;
        const result = await collections.invitations.insertOne(newInvitation);

        result
            ? res.status(201).send(result)
            : res.status(500).send("Failed to create a new service.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT
invitationRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedInvitation: Invitation = req.body as Invitation;
        const query = { _id: new ObjectId(id) };

        const result = await collections.invitations.updateOne(query, { $set: updatedInvitation });
        // console.log(updatedInvitation, 'invitation');
        if (updatedInvitation.inviteConfirmation === 'accepted') {
            console.log(updatedInvitation)
            await collections.allocations.updateOne(
                { _id: new ObjectId(updatedInvitation.allocationId) },
                { $set: { serviceStatus: "confirmed", confirmedEmployeeId: new ObjectId(updatedInvitation.employeeId) } });
            await collections.users.updateOne(
                { _id: new ObjectId(updatedInvitation.employeeId) },
                { $push: { "workScheduleTaken": new Date(updatedInvitation.confirmedServiceDate) } }
            );
        }
        if (updatedInvitation.inviteConfirmation === "rejected") {
            const updatedAllocation = await collections.allocations.updateOne(
                { _id: new ObjectId(updatedInvitation.allocationId) },
                {
                    $push: { "rejectedEmployees": new ObjectId(updatedInvitation.employeeId) },
                    $unset: { tentativeEmployeeId: "" }
                });
            console.log(updatedAllocation, 'update rejected');
        }
        result
            ? res.status(200).send(`Successfully updated invitation with id ${id}`)
            : res.status(304).send(`Service with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
invitationRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.invitations.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed invitation with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove invitation with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`invitation with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});