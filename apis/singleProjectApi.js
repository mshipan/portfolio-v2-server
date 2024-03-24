const express = require("express");
const { ObjectId } = require("mongodb");

const singleprojectApi = (projectsCollection) => {
  const singleProjectRouter = express.Router();

  // Get / View project by id
  singleProjectRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await projectsCollection.findOne(query);
    res.send(result);
  });

  // PUT/update project Api
  singleProjectRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateProject = req.body;
    const newProject = {
      $set: {
        projectTitle: updateProject.projectTitle,
        projectBanner: updateProject.projectBanner,
        projectBg: updateProject.projectBg,
        projectDescription: updateProject.projectDescription,
        projectGoals: updateProject.projectGoals,
        projectDuration: updateProject.projectDuration,
        startDate: updateProject.startDate,
        endDate: updateProject.endDate,
        liveLink: updateProject.liveLink,
        githubClient: updateProject.githubClient,
        conclusion: updateProject.conclusion,
        projectFeatures: updateProject.projectFeatures,
      },
    };
    const result = await projectsCollection.updateOne(
      filter,
      newProject,
      options
    );
    res.send(result);
  });

  // Delete project api
  singleProjectRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await projectsCollection.deleteOne(query);
    res.send(result);
  });
  return singleProjectRouter;
};

module.exports = singleprojectApi;
