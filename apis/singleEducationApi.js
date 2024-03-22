const express = require("express");
const { ObjectId } = require("mongodb");

const singleEducationApi = (singleEducationCollection) => {
  const singleEducationsRouter = express.Router();

  // Get / View education by id
  singleEducationsRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await singleEducationCollection.findOne(query);
    res.send(result);
  });

  // PUT/update education Api
  singleEducationsRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateEducation = req.body;
    const newEducation = {
      $set: {
        title: updateEducation.title,
        starYear: updateEducation.starYear,
        endYear: updateEducation.endYear,
        description: updateEducation.description,
      },
    };
    const result = await singleEducationCollection.updateOne(
      filter,
      newEducation,
      options
    );
    res.send(result);
  });

  // Delete education
  singleEducationsRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await singleEducationCollection.deleteOne(query);
    res.send(result);
  });

  return singleEducationsRouter;
};

module.exports = singleEducationApi;
