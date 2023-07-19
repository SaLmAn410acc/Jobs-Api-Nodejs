const { BadRequestError, NotFoundError } = require("../errors");
const Job = require("../models/Job");
const User = require("../models/User");

const getAllJobs = async (req, res) => {
  const user = await User.findById(req.user.userid);

  // console.log(user);
  if (!user) {
    throw new BadRequestError("Wrong user");
  }

  const job = await Job.find({
    createdBy: user._id,
  });

  if (!job) {
    throw new NotFoundError(`No job created by ${user._id}`);
  }

  res.status(200).json({ job: job });
};

const getSingleJob = async (req, res) => {
  // console.log(req.params.id);
  const job = await Job.findOne({
    _id: req.params.id,
    createdBy: req.user.userid,
  });

  if (!job) {
    throw new NotFoundError(`No job created by ${req.user.userid}`);
  }

  res.status(200).json({ job });
};

const createJob = async (req, res) => {
  // console.log(req.user);

  const { company, position } = req.body;

  // console.log(req.user.userid);

  const job = await Job.create({
    company: company,
    position: position,
    createdBy: req.user.userid,
  });

  res.status(200).json({
    job,
  });
};

const deleteJob = async (req, res) => {
  const { jobId } = req.params.id;

  const chkJob = await Job.findOneAndRemove(jobId);

  if (!chkJob) {
    throw new NotFoundError(`No job found by id: ${jobId}`);
  }

  res.status(200).json({
    msg: "Sucessfully Deleted Job!!",
  });
};

const updateJob = async (req, res) => {
  const { company, position } = req.body;

  if (company === "" || position === "") {
    throw new BadRequestError("Must provide company and position");
  }

  const findJob = await Job.findById(req.params.id);

  if (!findJob) {
    throw new NotFoundError(`No job Found by this id: ${req.params.id}`);
  }

  const updatedJob = await Job.findByIdAndUpdate(
    req.params.id,
    {
      company: company,
      position: position,
    },
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(200).json({
    updatedJob: updatedJob,
  });
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  deleteJob,
  updateJob,
};
