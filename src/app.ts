import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connectToDatabase } from "./services/database.service";
import { servicesRouter, usersRouter } from "./routes/"

const app = express();
const mongoose = require("mongoose");

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());

app.get("/user", function (req, res) {

    // ir a base de datos
    mongoose.connect('')

    // pedir user

    let user = {}

    // regresar info del user

    // si el user no se encuentra, regresar un error 404
})

app.get("/", function (req, res) {
    res.send("Hello Worlds");
});
connectToDatabase().then(() => {
    app.use("/yuva-api/services", servicesRouter);
    app.use("/yuva-api/users", usersRouter)

    app.listen(process.env.PORT, () => {
        console.log(`Server started at http://localhost:${process.env.PORT}`);
    });
}).catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
});