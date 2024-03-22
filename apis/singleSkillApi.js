const express = require("express");
const { ObjectId } = require("mongodb");

const singleSkillApi = (singleskillCollection) => {
  const singleSkillRouter = express.Router();
  // Get / View skill by id
  singleSkillRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await singleskillCollection.findOne(query);
    res.send(result);
  });

  // PUT/update skill Api
  singleSkillRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateSkill = req.body;
    const newSkill = {
      $set: {
        skillName: updateSkill.skillName,
        skillPercentage: updateSkill.skillPercentage,
      },
    };
    const result = await singleskillCollection.updateOne(
      filter,
      newSkill,
      options
    );
    res.send(result);
  });

  // Delete skill api
  singleSkillRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await singleskillCollection.deleteOne(query);
    res.send(result);
  });
  return singleSkillRouter;
};

module.exports = singleSkillApi;
