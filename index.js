const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// Import API modules
const aboutMeApi = require("./apis/aboutMeApi");
const educationsApi = require("./apis/educationsApi");
const singleEducationApi = require("./apis/singleEducationApi");
const skillsApi = require("./apis/skillsApi");
const singleSkillApi = require("./apis/singleSkillApi");
const projectsApi = require("./apis/projectsApi");
const singleProjectApi = require("./apis/singleProjectApi");
const blogsApi = require("./apis/blogsApi");
const singleBlogApi = require("./apis/singleBlogApi");

const corsConfig = {
  origin: "*",
  credentials: true,
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
    const educationsCollection = client
      .db("portfolio-v2")
      .collection("educations");
    const skillsCollection = client.db("portfolio-v2").collection("skills");
    const projectsCollection = client.db("portfolio-v2").collection("projects");
    const blogsCollection = client.db("portfolio-v2").collection("blogs");
    // collection end

    // Apis Start
    app.use("/about-me", aboutMeApi(aboutMeCollection));
    app.use("/educations", educationsApi(educationsCollection));
    app.use("/education", singleEducationApi(educationsCollection));
    app.use("/skills", skillsApi(skillsCollection));
    app.use("/skill", singleSkillApi(skillsCollection));
    app.use("/projects", projectsApi(projectsCollection));
    app.use("/project", singleProjectApi(projectsCollection));
    app.use("/blogs", blogsApi(blogsCollection));
    app.use("/blog", singleBlogApi(blogsCollection));

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
