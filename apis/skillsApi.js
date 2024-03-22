const express = require("express");
const { ObjectId } = require("mongodb");

const skillsApi = (skillsCollection) => {
  const skillsRouter = express.Router();
  // POST/Create an Skill Api
  skillsRouter.post("/", async (req, res) => {
    const newSkill = req.body;
    const result = await skillsCollection.insertOne(newSkill);
    res.send(result);
  });

  // GET/view skill Api
  skillsRouter.get("/", async (req, res) => {
    const result = await skillsCollection.find().toArray();
    res.send(result);
  });
  return skillsRouter;
};

module.exports = skillsApi;
