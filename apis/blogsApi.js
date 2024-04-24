const express = require("express");

const blogsApi = (blogsCollection) => {
  const blogsRouter = express.Router();

  // GET/view blogs Api
  blogsRouter.get("/", async (req, res) => {
    const result = await blogsCollection.find().toArray();
    res.send(result);
  });

  blogsRouter.post("/", async (req, res) => {
    const newProject = req.body;
    const result = await blogsCollection.insertOne(newProject);
    res.send(result);
  });
  return blogsRouter;
};

module.exports = blogsApi;
