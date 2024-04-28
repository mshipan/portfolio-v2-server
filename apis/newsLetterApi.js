const express = require("express");

const newsLettersApi = (newsLettersCollection) => {
  const newsLettersRouter = express.Router();

  // GET/view services Api
  newsLettersRouter.get("/", async (req, res) => {
    const result = await newsLettersCollection
      .find()
      .sort({
        createdAt: -1,
      })
      .toArray();
    res.send(result);
  });

  newsLettersRouter.post("/", async (req, res) => {
    const newNewsLetter = req.body;
    const newEmail = req.body.email;
    const existingEmail = await newsLettersCollection.findOne({
      email: newEmail,
    });
    if (existingEmail) {
      // If email already exists, send a response indicating that the email is already subscribed
      return res.status(400).json({ message: "Email already subscribed" });
    }
    if (existingEmail !== newNewsLetter.email) {
      const result = await newsLettersCollection.insertOne(newNewsLetter);
      return res.send(result);
    }
  });
  return newsLettersRouter;
};

module.exports = newsLettersApi;
