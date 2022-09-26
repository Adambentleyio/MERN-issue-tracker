const { json } = require("body-parser");
const mongoose = require("mongoose");
const issueMessage = require("../models/issueMessage.js");
const IssueMessage = require("../models/issueMessage.js");

const getIssues = async (req, res) => {
  try {
    const issueMessages = await IssueMessage.find();
    res.status(200).json(issueMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getIssue = async (req, res) => {
  try {
    const issue = await issueMessage.findById(
      {_id: req.params.id}
    )
    res.status(201).json(issue)
  }
  catch (error) {
    res.status(404).json({message: error.message});
  }
}




//     await issueMessage.findById(req.params.id, (err, id) => {
//       if (err) {
//         console.log(err.message)
//       } else {
//         res.status(201).json(id)
//       }
//     });
//     };

const createIssue = async (req, res) => {
  const issue = req.body;
  const newIssue = new IssueMessage(issue);

  try {
    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateIssue = async (req, res) => {
  try {
    // create variable that holds updated issue
    const updatedIssue =
    await issueMessage.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true })
      res.status(201).json(updatedIssue)
  } catch (error) {
    res.status(404).json({message: error.message})
  }}

// const deleteIssue = async (req, res) => {
//   await issueMessage.remove(
//     {
//       _id: req.params.id,
//     },
//     function (err, issue) {
//       if (err) res.send(err);
//       res.json({ message: "Huzzah, your issue was successfully deleted" });
//     }
//   );
// };

const deleteIssue = async (req, res) => {
  try {
    await issueMessage.deleteOne({
      _id: req.params.id,
    });
    res.status(200).json({ message: "Issue delete successful!" });
  } catch (error) {
    res.status(500).json({ error: "There was a Server Side Error!" });
  }
};

module.exports = {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
};
