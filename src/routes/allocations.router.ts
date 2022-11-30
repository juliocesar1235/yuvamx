// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Allocation from "../models/allocation";
import { findTentativeEmployee } from "../helpers/employee-match.helper";

// Global Config
export const allocationsRouter = express.Router();

allocationsRouter.use(express.json());

// GET
allocationsRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const allocations: Allocation[] = (await collections.allocations.find<Allocation>({}).toArray());
        console.log(`Allocations retrieved successfully, total of allocations: ${allocations.length}`)

        res.status(200).send(allocations);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

allocationsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {

        const query = { _id: new ObjectId(id) };
        const allocation: Allocation = await collections.allocations.findOne<Allocation>(query);
        console.log('Allocation find', allocation)

        if (allocation) {
            console.log(`Sending allocation:`, allocation._id.toString())
            res.status(200).send(allocation);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching allocation with id: ${req.params.id}`);
    }
});


// POST
allocationsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newAllocation = req.body as Allocation;
        newAllocation.confirmedServiceDate = new Date(newAllocation.confirmedServiceDate);
        if (newAllocation.contractorId) {
            newAllocation.contractorId = new ObjectId(newAllocation.contractorId);
        }
        if (newAllocation.serviceId) {
            newAllocation.serviceId = new ObjectId(newAllocation.serviceId);
        }
        if (newAllocation.confirmedEmployeeId) {
            newAllocation.confirmedEmployeeId = new ObjectId(newAllocation.confirmedEmployeeId);
        }
        if (newAllocation.tentativeEmployeeId) {
            newAllocation.tentativeEmployeeId = new ObjectId(newAllocation.tentativeEmployeeId);
        }

        const result = await collections.allocations.insertOne(newAllocation);

        result
            ? res.status(201).send(result)
            : res.status(500).send("Failed to create a new allocation.");
    } catch (error) {
        console.error(error);
        console.error(JSON.stringify(error));
        res.status(400).send(error.message);
    }
});

// PUT
allocationsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedAllocation: Allocation = req.body as Allocation;
        const query = { _id: new ObjectId(id) };

        const result = await collections.allocations.updateOne(query, { $set: updatedAllocation });

        result
            ? res.status(200).send(result)
            : res.status(304).send(`Allocation with id: ${id} could not be updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
allocationsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.allocations.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed allocation with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove allocation with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Allocation with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// CORE API
allocationsRouter.get("/allocation-match/:id", async (req: Request, res: Response) => {
    const id = req?.params.id;
    try {
        const query = { _id: new ObjectId(id) };
        const allocation: Allocation = await collections.allocations.findOne<Allocation>(query);
        if (!allocation.tentativeEmployeeId) {
            findTentativeEmployee(allocation.confirmedServiceDate, allocation.rejectedEmployees);
        }
        res.status(200).send(allocation);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
})

allocationsRouter.get("/history/:userid/:type", async (req: Request, res: Response) => {
    const id = req?.params?.userid;
    const type = req?.params?.type;
    console.log(JSON.stringify(req.params));
    if (!type) {
        res.status(404).send('Bad request, please send the user type');
    }
    let query = {};
    if (type == 'employee') {
        query = { confirmedEmployeeId: new ObjectId(id) };
    }

    if (type == 'contractor') {
        query = { contractorId: new ObjectId(id) };
    }
    try {
        const allocation: Allocation = await collections.allocations.findOne<Allocation>(query);
        console.log('Allocation find', allocation)

        if (allocation) {
            console.log(`Sending allocation:`, allocation._id.toString())
            res.status(200).send(allocation);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching allocation with id: ${req.params.id}`);
    }
});