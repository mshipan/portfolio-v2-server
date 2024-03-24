const express = require("express");

const projectsApi = (projectsCollection) => {
  const projectsRouter = express.Router();

  // GET/view projects Api
  projectsRouter.get("/", async (req, res) => {
    const result = await projectsCollection.find().toArray();
    res.send(result);
  });

  projectsRouter.post("/", async (req, res) => {
    const newProject = req.body;
    const result = await projectsCollection.insertOne(newProject);
    res.send(result);
  });
  return projectsRouter;
};

module.exports = projectsApi;
