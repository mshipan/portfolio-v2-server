const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

const corsConfig = {
  origin: "*",
  credentials: true,
  // methods: ["GET", "POST", "PUT", "DELETE"],
  optionSuccessStatus: 200,
};

//middlewares
app.use(cors(corsConfig));
app.options("", cors(corsConfig));
app.use(express.json());

//mongodb start

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1oh7p7d.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // collection start
    const aboutMeCollection = client.db("portfolio-v2").collection("about-me");
    const educationCollection = client
      .db("portfolio-v2")
      .collection("educations");
    // collection end

    //APIs start

    // Get/view about-me Api
    app.get("/about-me", async (req, res) => {
      const result = await aboutMeCollection.find().toArray();
      res.send(result);
    });

    // PUT/update about-me Api
    app.put("/about-me/:id", async (req, res) => {
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
        },
      };
      const result = await aboutMeCollection.updateOne(
        filter,
        newAboutMe,
        options
      );
      res.send(result);
    });

    // GET/view education Api
    app.get("/educations", async (req, res) => {
      const result = await educationCollection.find().toArray();
      res.send(result);
    });

    // POST/Create an Education Api
    app.post("/educations", async (req, res) => {
      const newEducation = req.body;
      const result = await educationCollection.insertOne(newEducation);
      res.send(result);
    });
    // Get / View education by id
    app.get("/education/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await educationCollection.findOne(query);
      res.send(result);
    });

    // PUT/update education Api
    app.put("/education/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateEducation = req.body;
      const newEducation = {
        $set: {
          title: updateEducation.title,
          starYear: updateEducation.starYear,
          endYear: updateEducation.endYear,
          description: updateEducation.description,
        },
      };
      const result = await educationCollection.updateOne(
        filter,
        newEducation,
        options
      );
      res.send(result);
    });

    // Delete education
    app.delete("/education/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await educationCollection.deleteOne(query);
      res.send(result);
    });
    //APIs end

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//mongodb end

//basic setup
app.get("/", (req, res) => {
  res.send("Portfolio-v2 server is running");
});

app.listen(port, () => {
  console.log(`Portfolio v2 server is running on port: ${port}`);
});
