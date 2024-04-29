// Import necessary modules
const express = require("express");
const { ObjectId } = require("mongodb");

// Function to create the comment API endpoint
const commentApi = (blogsCollection) => {
  const commentRouter = express.Router();

  // POST / Add comment to a blog
  commentRouter.post("/:id/comment", async (req, res) => {
    try {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      // Retrieve the blog post from the database
      const blog = await blogsCollection.findOne(query);

      if (!blog) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      // Extract comment data from the request body
      const { name, role, email, comment, createdAt } = req.body;

      // Append the new comment with createdAt to the blog post
      if (!blog.comments) {
        blog.comments = [];
      }
      blog.comments.push({ name, role, email, comment, createdAt });

      // Update the blog post with the new comment
      const updateResult = await blogsCollection.updateOne(query, {
        $set: { comments: blog.comments },
      });

      if (updateResult.modifiedCount === 0) {
        return res.status(500).json({ error: "Failed to add comment" });
      }

      // Return the updated blog post
      res.json(blog);
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return commentRouter;
};

// Export the comment API endpoint
module.exports = commentApi;
