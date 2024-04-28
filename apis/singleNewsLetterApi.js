const express = require("express");
const { ObjectId } = require("mongodb");

const singleNewsLetterApi = (newsLettersCollection) => {
  const singleNewsLetterRouter = express.Router();

  // Get / View service by id
  singleNewsLetterRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await newsLettersCollection.findOne(query);
    res.send(result);
  });

  // Delete service api
  singleNewsLetterRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await newsLettersCollection.deleteOne(query);
    res.send(result);
  });
  return singleNewsLetterRouter;
};

module.exports = singleNewsLetterApi;
