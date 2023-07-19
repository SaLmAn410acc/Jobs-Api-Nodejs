const router = require("express").Router();
const {
  getAllJobs,
  getSingleJob,
  createJob,
  deleteJob,
  updateJob,
} = require("../controllers/jobs");

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").delete(deleteJob).get(getSingleJob).patch(updateJob);

module.exports = router;
