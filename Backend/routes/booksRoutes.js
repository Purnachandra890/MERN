import express from "express";
import Book from "../models/BookModels.js";

const router=express.Router();
// create a books
router.post("/", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({
          message: "send all required fields:title,author,publishYea",
        });
      }
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
      const book = await Book.create(newBook);
      return res.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ message: error.message });
    }
  });
  // to get books
  router.get("/", async (req, res) => {
    try {
      const books = await Book.find({});
      return res.status(200).json(books);
    } catch (error) {
      console.log();
    }
  });
  // to get book
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
      return res.status(200).json(book);
    } catch (error) {
      console.log(error.message);
    }
  });
  // update a book
  router.put("/:id", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.send({
          message: "send all required fileds :title,author,publishYear",
        });
      }
  
      const { id } = req.params;
      const result = await Book.findByIdAndUpdate(id, req.body);
  
      if (!result) {
        return res.send({ message: "books is not found " });
      }
  
      return res.send({ message: "book is updated successfully" });
    } catch (error) {
      console.log(error.message);
    }
  });
  // delete book
  router.delete("/:id", async (req, res) => {
    try {
      
      const { id } = req.params;
      let deleteItem = await Book.findByIdAndDelete(id);
  
      if (!deleteItem) {
        return res.send({ message: "failed to delete the item" });
      }
      return res.send({ message: "successfully deleted" });
    } catch (error) {
      return res.send(error.message);
    }
  });


  export default router;
