const express = require("express");
const { ObjectId } = require("mongodb");

const singleContactApi = (contactsCollection) => {
  const singleContactRouter = express.Router();

  // Get / View contact by id
  singleContactRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await contactsCollection.findOne(query);
    res.send(result);
  });

  // Update isNew status of a contact
  singleContactRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const update = { $set: { isNew: false } };
    const result = await contactsCollection.updateOne(query, update);
    res.send(result);
  });

  // Delete contact api
  singleContactRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await contactsCollection.deleteOne(query);
    res.send(result);
  });
  return singleContactRouter;
};

module.exports = singleContactApi;
