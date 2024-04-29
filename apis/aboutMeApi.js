const express = require("express");
const { ObjectId } = require("mongodb");

const aboutMeApi = (aboutMeCollection) => {
  const aboutMeRouter = express.Router();
  //APIs start

  // Get/view about-me Api
  aboutMeRouter.get("/", async (req, res) => {
    const result = await aboutMeCollection.find().toArray();
    res.send(result);
  });

  // PUT/update about-me Api
  aboutMeRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateAboutMe = req.body;
    const newAboutMe = {
      $set: {
        name: updateAboutMe.name,
        role: updateAboutMe.role,
        about: updateAboutMe.about,
        mobile: updateAboutMe.mobile,
        email: updateAboutMe.email,
        address: updateAboutMe.address,
        website: updateAboutMe.website,
        maplink: updateAboutMe.maplink,
        watchTheVideo: updateAboutMe.watchTheVideo,
        facebook: updateAboutMe.facebook,
        twitter: updateAboutMe.twitter,
        github: updateAboutMe.github,
        linkedin: updateAboutMe.linkedin,
        cvDriveLink: updateAboutMe.cvDriveLink,
        resumeDriveLink: updateAboutMe.resumeDriveLink,
        experience: updateAboutMe.experience,
      },
    };
    const result = await aboutMeCollection.updateOne(
      filter,
      newAboutMe,
      options
    );
    res.send(result);
  });
  return aboutMeRouter;
};

module.exports = aboutMeApi;
