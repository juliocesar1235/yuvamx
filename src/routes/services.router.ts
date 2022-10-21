// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Service from "../models/service";

// Global Config
export const servicesRouter = express.Router();

servicesRouter.use(express.json());

// GET
servicesRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const services: Service[] = (await collections.services.find<Service>({}).toArray());
        console.log(`Services retrieved successfully, total of services: ${services.length}`)

        res.status(200).send(services);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

servicesRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {

        const query = { _id: new ObjectId(id) };
        const service = (await collections.services.findOne<Service>(query)) as Service;
        console.log('Service find', service)

        if (service) {
            console.log(`Service data send: ${service.name}`)
            res.status(200).send(service);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST
servicesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newService = req.body as Service;
        const result = await collections.services.insertOne(newService);

        result
            ? res.status(201).send(result)
            : res.status(500).send("Failed to create a new service.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT
servicesRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedService: Service = req.body as Service;
        const query = { _id: new ObjectId(id) };

        const result = await collections.services.updateOne(query, { $set: updatedService });

        result
            ? res.status(200).send(`Successfully updated service with id ${id}`)
            : res.status(304).send(`Service with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
servicesRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.services.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed service with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove service with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Service with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});