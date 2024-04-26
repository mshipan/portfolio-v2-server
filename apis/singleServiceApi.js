const express = require("express");
const { ObjectId } = require("mongodb");

const singleServiceApi = (servicesCollection) => {
  const singleServiceRouter = express.Router();

  // Get / View service by id
  singleServiceRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await servicesCollection.findOne(query);
    res.send(result);
  });

  // PUT/update service Api
  singleServiceRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateService = req.body;
    const newService = {
      $set: {
        serviceTitle: updateService.serviceTitle,
        serviceImage: updateService.serviceImage,
        serviceDescription: updateService.serviceDescription,
      },
    };
    const result = await servicesCollection.updateOne(
      filter,
      newService,
      options
    );
    res.send(result);
  });

  // Delete service api
  singleServiceRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await servicesCollection.deleteOne(query);
    res.send(result);
  });
  return singleServiceRouter;
};

module.exports = singleServiceApi;
