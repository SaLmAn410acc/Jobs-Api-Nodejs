const router = require("express").Router();
const { loginController, registerController } = require("../controllers/auth");

router.route("/login").post(loginController);
router.route("/register").post(registerController);

module.exports = router;
