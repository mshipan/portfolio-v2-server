const express = require("express");

const blogsApi = (blogsCollection) => {
  const blogsRouter = express.Router();

  // GET/view blogs Api
  blogsRouter.get("/", async (req, res) => {
    const result = await blogsCollection.find().toArray();
    res.send(result);
  });

  blogsRouter.post("/", async (req, res) => {
    const newBlog = req.body;
    const result = await blogsCollection.insertOne(newBlog);
    res.send(result);
  });
  return blogsRouter;
};

module.exports = blogsApi;
