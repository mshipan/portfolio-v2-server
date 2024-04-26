const express = require("express");

const servicesApi = (servicesCollection) => {
  const servicesRouter = express.Router();

  // GET/view services Api
  servicesRouter.get("/", async (req, res) => {
    const result = await servicesCollection.find().toArray();
    res.send(result);
  });

  servicesRouter.post("/", async (req, res) => {
    const newService = req.body;
    const result = await servicesCollection.insertOne(newService);
    res.send(result);
  });
  return servicesRouter;
};

module.exports = servicesApi;
