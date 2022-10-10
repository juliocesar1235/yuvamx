import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();


const app = express();
const mongoose = require("mongoose");

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

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

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});