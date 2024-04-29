const express = require("express");
const { ObjectId } = require("mongodb");

const singleBlogApi = (blogsCollection) => {
  const singleBlogRouter = express.Router();

  // Get / View blog by id
  singleBlogRouter.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogsCollection.findOne(query);

      // Sort comments by createdAt in descending order
      if (result && result.comments) {
        result.comments.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }

      res.send(result);
    } catch (error) {
      console.error("Error fetching blog by id:", error);
      res.status(500).json({ error: "Internal server error" });
    }
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

  // POST / Add likes to a blog
  singleBlogRouter.post("/:id/like", async (req, res) => {
    try {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      // Retrieve the blog post from the database
      const blog = await blogsCollection.findOne(query);

      if (!blog) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      // Increment the like count
      blog.likes = (blog.likes || 0) + 1;

      // Update the blog post with the incremented like count
      const updateResult = await blogsCollection.updateOne(query, {
        $set: { likes: blog.likes },
      });

      if (updateResult.modifiedCount === 0) {
        return res.status(500).json({ error: "Failed to add like" });
      }

      // Return the updated blog post
      res.json(blog);
    } catch (error) {
      console.error("Error adding like:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // DELETE / Remove likes from a blog
  singleBlogRouter.delete("/:id/like", async (req, res) => {
    try {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      // Retrieve the blog post from the database
      const blog = await blogsCollection.findOne(query);

      if (!blog) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      // Decrement the like count
      blog.likes = (blog.likes || 0) - 1;

      // Update the blog post with the decremented like count
      const updateResult = await blogsCollection.updateOne(query, {
        $set: { likes: blog.likes },
      });

      if (updateResult.modifiedCount === 0) {
        return res.status(500).json({ error: "Failed to remove like" });
      }

      // Return the updated blog post
      res.json(blog);
    } catch (error) {
      console.error("Error removing like:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return singleBlogRouter;
};

module.exports = singleBlogApi;
