const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const issueRoutes = require("./routes/issues.js");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// allow api for cross-origin resource sharing
app.use(cors());

// allow our api for parsing JSON
app.use(express.json());

// allow our api to receive data from a client app
app.use(express.urlencoded({ extended: true }));

const CONNECTION_URL = `mongodb+srv://${process.env.MONG_LOGIN}@mern01.akpif.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&authSource=admin`;
// console.log(CONNECTION_URL);

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// Pick up React index.html file
//commenting below to see if I can run the app in render.com

// if (process.env.NODE_ENV === "production") {
//   // set static folder
//   console.log("running in production mode");
//   app.use(express.static(path.join(__dirname, "../client/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.use("/issues", issueRoutes);

// testing the fetchIssues reducer

// app.get("/api/hello", (req, res) => {
//   res.send({ express: "Hello From Express" });
// });

// app.post("/api/data", (req, res) => {
//   console.log(req.body);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`
//   );
// });

// app.get("/api/issues", (req, res) => {
//   res.send([
//     {
//       title: "my express issue",
//       description: "my express description",
//     },
//   ]);
// });

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
