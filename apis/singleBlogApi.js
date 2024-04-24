const express = require("express");
const { ObjectId } = require("mongodb");

const singleBlogApi = (blogsCollection) => {
  const singleBlogRouter = express.Router();

  // Get / View blog by id
  singleBlogRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await blogsCollection.findOne(query);
    res.send(result);
  });

  // PUT/update blog Api
  singleBlogRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateBlog = req.body;
    const newBlog = {
      $set: {
        blogTitle: updateBlog.blogTitle,
        blogBanner: updateBlog.blogBanner,
        authorName: updateBlog.authorName,
        authorImage: updateBlog.authorImage,
        createdAt: updateBlog.createdAt,
        blogDescription: updateBlog.blogDescription,
      },
    };
    const result = await blogsCollection.updateOne(filter, newBlog, options);
    res.send(result);
  });

  // Delete blog api
  singleBlogRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await blogsCollection.deleteOne(query);
    res.send(result);
  });
  return singleBlogRouter;
};

module.exports = singleBlogApi;
