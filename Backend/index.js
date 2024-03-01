import express from "express";
import mongoose from "mongoose";
import booksRouter from "./routes/booksRoutes.js";
import cors from "cors";
const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

app.use("/books",booksRouter);

const mongoDbUrl =
  "mongodb+srv://purnachandra:purnachandra890@bookstore.ph7hthk.mongodb.net/?retryWrites=true&w=majority&appName=Bookstore";



mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log("App connected to database");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
