const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const issueRoutes = require("./routes/issues.js");

const app = express();
const PORT = process.env.PORT || 5000;

// allow api for cross-origin resource sharing
app.use(cors());

// allow our api for parsing JSON
app.use(express.json());

// allow our api to receive data from a client app
app.use(express.urlencoded({ extended: true }));

// register routes for our api endpoints

//http://localhost:5000/api/issues - GET, POST
//http://localhost:5000/api/issues/:id - PATCH, GET, DELETE
//http://localhost:5000/api/issues/user - GET

const CONNECTION_URL = `mongodb+srv://mernstack123:mernstack123@mern01.akpif.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/api/data", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

app.use("/issues", issueRoutes);

// testing the fetchIssues reducer

app.get("/api/issues", (req, res) => {
  res.send([
    {
      title: "my express issue",
      description: "my express description",
    },
  ]);
});

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
