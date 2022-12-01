import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connectToDatabase } from "./services/database.service";
import { allocationsRouter, invitationRouter, servicesRouter, usersRouter } from "./routes/"

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());

connectToDatabase().then(() => {
    app.use("/yuva-api/services", servicesRouter);
    app.use("/yuva-api/users", usersRouter);
    app.use("/yuva-api/allocations", allocationsRouter);
    app.use("/yuva-api/invitations", invitationRouter);

    app.listen(process.env.PORT, () => {
        console.log(`Server started at http://localhost:${process.env.PORT}`);
    });
}).catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
});