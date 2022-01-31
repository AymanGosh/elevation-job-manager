const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Student = require("../models/Student");
const Interview = require("../models/Interview");

router.get("/jobs/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const jobs = Student.findOne({ _id: id })
      .populate({
        path: "jobs",
        populate: {
          path: "interviews",
        },
        options: { sort: { mostRecentInterview: -1 } },
      })
      .exec(function (err, student) {
        res.send(student.jobs);
      });
  } catch (error) {
    res.send(error);
  }
});

router.post("/jobs/:id", async (req, res) => {
  let id = req.params.id;

  try {
    let job = new Job({
      companyName: req.body.companyName,
      role: req.body.role,
      location: req.body.location,
      description: req.body.description,
      status: "Open",
      whereFindJob: req.body.whereFindJob,
      studentId: id,
    });

    Student.findByIdAndUpdate(
      id,
      { $push: { jobs: job } },
      function (err, user) {}
    );
    await job.save();
    res.send(job);
  } catch (error) {
    res.send(error);
  }
});

// router.get("/jobs/:id/interviews", async (req, res) => {
//   let id=req.params.id
//   try {
//  const interviews= Job.findOne({ _id: id })
//   .populate('interviews')
//   .exec(function (err, job) {
//       res.send(job.interviews)
//   })}catch (error) {
//       res.send(error);
//     }
// });

router.post("/jobs/:id/interviews", async (req, res) => {
  let id = req.params.id;

  try {
    let interview = new Interview({
      type: req.body.type,
      time: req.body.time,
      interviewerName: req.body.interviewerName,
    });
    Job.findByIdAndUpdate(
      id,
      { $push: { interviews: interview }, mostRecentInterview: req.body.time },
      function (err, interview) {}
    );
    await interview.save();
    res.send(interview);
  } catch (error) {
    res.send(error);
  }
});
router.post("/jobs/status/:jobId/interviews", async (req, res) => {
  const id = req.params.jobId;

  try {
    Job.findByIdAndUpdate(
      id,
      { status: req.body.status },
      function (err, user) {}
    );
    res.send().status(200);
  } catch (error) {
    res.send(error).status(500);
  }
});

module.exports = router;