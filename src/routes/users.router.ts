// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/user";

// Global Config
export const usersRouter = express.Router();

usersRouter.use(express.json());

// GET
usersRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const users: User[] = (await collections.users.find<User>({}).toArray());
        console.log(`Users retrieved successfully, total of users: ${users.length}`)

        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {

        const query = { _id: new ObjectId(id) };
        const user: User = await collections.users.findOne<User>(query);
        console.log('User find', user)

        if (user) {
            console.log(`Sending user: ${user.firstName}`)
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching user with id: ${req.params.id}`);
    }
});

// POST
usersRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newUser = req.body as User;
        if (newUser.dateOfBirth) {
            newUser.dateOfBirth = new Date(newUser.dateOfBirth);
        }
        if (newUser.serviceId) {
            newUser.serviceId = new ObjectId(newUser.serviceId);
        }
        const result = await collections.users.insertOne(newUser);
        console.log(result, "New user created successfully");
        result
            ? res.status(201).send(result)
            : res.status(500).send("Failed to create a new user.");
    } catch (error) {
        console.error(error);
        console.error(JSON.stringify(error));
        res.status(400).send(error.message);
    }
});

// PUT
usersRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedService: User = req.body as User;
        const query = { _id: new ObjectId(id) };

        const result = await collections.users.updateOne(query, { $set: updatedService });

        result
            ? res.status(200).send(`Successfully updated user with id ${id}`)
            : res.status(304).send(`Service with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
usersRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.users.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed user with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove user with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`User with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});