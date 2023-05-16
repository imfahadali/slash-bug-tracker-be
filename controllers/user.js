const { Prisma, prisma } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userQueries = require("../queries/user");
const { generateAccessToken } = require("../utils/helperFunctions");

exports.getAll = async (req, res) => {
  const allUsers = await userQueries.findAll();

  res.send(allUsers);
};

exports.getUnassigned = async (req, res) => {
  const unassignedUsers = await userQueries.findUnassigned();
  console.log(unassignedUsers);
  res.send(unassignedUsers);
};

exports.getOne = async (req, res) => {
  const { id: userId } = req.params;
  const user = await userQueries.findOne(userId);

  res.send(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!(email, password)) res.status(400).send("All input is required");

  try {
    const user = await userQueries.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await generateAccessToken({ email, id: user.id });
      // user.token = token;
      return res.status(200).send({
        email: user.email,
        name: user.name,
        profile: user.profile,
        token,
      });
    }

    res.status(401).send("Invalid Credentials");
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.register = async (req, res) => {
  const { name, email, password, profile } = req.body;

  if (!(email && password && name)) {
    res.status(400).send("All input fields are required");
  }

  console.log(email);
  try {
    const oldUser = await userQueries.findOne(email);
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await userQueries.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      profile,
    });
    const token = await generateAccessToken({ email, id: user.id });
    // user.token = token;

    res.status(201).send({
      email: user.email,
      name: user.name,
      profile: user.profile,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.deleteOne = async (req, res) => {
  const { id: userId } = req.params;
  const user = await userQueries.delete(userId);
  res.send(user);
};

exports.updateOne = async (req, res) => {
  const { ticketsToConnect, ticketsToDisconnect, email } = req.body;

  const user = await userQueries.updateTicket({
    ticketsToConnect,
    ticketsToDisconnect,
    email,
  });
  res.send(user);
};
