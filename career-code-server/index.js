require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const admin = require("firebase-admin");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const decoded = Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString('utf-8');
const serviceAccount = JSON.parse(decoded);

app.use(cors());
app.use(express.json());

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-vqfukn7-shard-00-00.bqm4kai.mongodb.net:27017,ac-vqfukn7-shard-00-01.bqm4kai.mongodb.net:27017,ac-vqfukn7-shard-00-02.bqm4kai.mongodb.net:27017/?ssl=true&replicaSet=atlas-c680b1-shard-0&authSource=admin&appName=Cluster41102`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const jobsCollection = client.db('careerCodeFour').collection('jobsFour');
const applicationsCollection = client.db('careerCodeFour').collection('ApplicationsFour');


const connectDB = client.connect();


const verifyFireBaseToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'unauthorized access' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: 'unauthorized access' });
  }
}

const verifyTokenEmail = (req, res, next) => {
  if (req.query.email !== req.decoded.email) {
    return res.status(403).send({ message: 'forbidden access' });
  }
  next();
}


app.get("/", (req, res) => {
  res.send("career code cooking");
});

app.get('/jobs', async (req, res) => {
  await connectDB;
  const email = req.query.email;
  const query = {};
  if (email) {
    query.hr_email = email;
  }
  const result = await jobsCollection.find(query).toArray();
  res.send(result);
});

app.post('/jobs', async (req, res) => {
  await connectDB;
  const newJob = req.body;
  const result = await jobsCollection.insertOne(newJob);
  res.send(result);
});

app.get('/jobs/applications', verifyFireBaseToken, verifyTokenEmail, async (req, res) => {
  await connectDB;
  const email = req.query.email;
  const query = { hr_email: email };
  const jobs = await jobsCollection.find(query).toArray();
  for (const job of jobs) {
    const applicationQuery = { jobId: job._id.toString() };
    const application_count = await applicationsCollection.countDocuments(applicationQuery);
    job.application_count = application_count;
  }
  res.send(jobs);
});

app.get('/jobs/:id', async (req, res) => {
  await connectDB;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await jobsCollection.findOne(query);
  res.send(result);
});

app.get('/applications', verifyFireBaseToken, verifyTokenEmail, async (req, res) => {
  await connectDB;
  const email = req.query.email;
  const query = { applicant: email };
  const result = await applicationsCollection.find(query).toArray();
  for (const application of result) {
    const jobId = application.jobId;
    const jobQuery = { _id: new ObjectId(jobId) };
    const job = await jobsCollection.findOne(jobQuery);
    application.company = job.company;
    application.title = job.title;
    application.company_logo = job.company_logo;
  }
  res.send(result);
});

app.post('/applications', async (req, res) => {
  await connectDB;
  const application = req.body;
  const result = await applicationsCollection.insertOne(application);
  res.send(result);
});

app.get('/applications/job/:job_id', async (req, res) => {
  await connectDB;
  const job_id = req.params.job_id;
  const query = { jobId: job_id };
  const result = await applicationsCollection.find(query).toArray();
  res.send(result);
});

app.patch('/applications/:id', async (req, res) => {
  await connectDB;
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: {
      status: req.body.status
    }
  };
  const result = await applicationsCollection.updateOne(filter, updatedDoc);
  res.send(result);
});

app.listen(port, () => {
  console.log(`port is running ${port}`);
});

module.exports = app;