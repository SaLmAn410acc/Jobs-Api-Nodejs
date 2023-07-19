const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all credentials!!");
  }

  const chkUser = await User.findOne({ email });

  if (!chkUser) {
    throw new UnauthenticatedError("Invalid No User found");
  }

  const ismatch = await chkUser.checkPassword(password);

  if (!ismatch) {
    throw new UnauthenticatedError("Invalid Password");
  }

  const token = chkUser.createJWT();

  res.status(StatusCodes.OK).json({
    user: { name: chkUser.name },
    token: token,
  });
};

const registerController = async (req, res) => {
  //   const { name, email, password } = req.body;

  //   if (!name || !email || !password) {
  //     throw new BadRequestError("Please provide all credentials!!");
  //   }

  //   const tempUser = { name, email, password: hashPassword };

  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: { user: user.name },
    token: token,
  });
};

module.exports = {
  loginController,
  registerController,
};
