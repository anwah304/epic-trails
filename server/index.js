import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserModel from "./models/Users.js";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3002, () => {
  console.log("Server Connected at port no 3002");
});

const Epic = "mongodb+srv://16j19141_db_user:anwah123@cluster0.uvgfguu.mongodb.net/Epic-Trails";

mongoose.connect(Epic)
  .then(() => console.log("Database Connected.."))
  .catch((error) => console.log("Database Connection Error.. " + error));