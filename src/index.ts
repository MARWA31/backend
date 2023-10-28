import "reflect-metadata";
import  express from "express";
import { useExpressServer } from "routing-controllers";
import { UserController } from "./user/user.controller";
import * as mongoose from 'mongoose';


mongoose.connect("mongodb://localhost:27017/marawa");
const app = express();

useExpressServer(app, {
    controllers: [ UserController], // Chemin vers le UserController
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});