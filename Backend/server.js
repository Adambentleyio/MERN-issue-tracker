require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler')

const cors = require("cors");
const corsOptions = require('./config/corsOptions')
const bodyParser = require("body-parser");
const issueRoutes = require("./routes/issues.js");
const { appendFile } = require("fs");
const cookieParser = require("cookie-parser");
const connectDB = require('./config/dbConn.js');
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

connectDB()

app.use(logger)

// allow api for cross-origin resource sharing
app.use(cors());

// allow our api for parsing JSON
app.use(express.json());

// allow our api to handle cookies
app.use(cookieParser())

// allow our api to receive data from a client app
app.use(express.urlencoded({ extended: true }));

console.log("Node Env: " + process.env.NODE_ENV)
const CONNECTION_URL = process.env.DATABASE_URI;

  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })

  mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
  })

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

//! Throws error that app.use() requires middleware function ⬇

//! app.use(errorHandler);

//
//
//
// OLD CODE

// mongoose connection
// mongoose
//   .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() =>
//     app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
//   )
//   .catch((error) => console.log(error.message));

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
