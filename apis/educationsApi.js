const express = require("express");
const { ObjectId } = require("mongodb");

const educationsApi = (educationCollection) => {
  const educationsRouter = express.Router();

  educationsRouter.get("/", async (req, res) => {
    const result = await educationCollection.find().toArray();
    res.send(result);
  });

  // POST/Create an Education Api
  educationsRouter.post("/", async (req, res) => {
    const newEducation = req.body;
    const result = await educationCollection.insertOne(newEducation);
    res.send(result);
  });

  return educationsRouter;
};

module.exports = educationsApi;
