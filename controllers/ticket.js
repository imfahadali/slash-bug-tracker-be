const ticketQueries = require("../queries/ticket");

exports.getOne = (req, res) => {
  const { id: ticketId } = req.params;
  ticketQueries.findOne(ticketId);
  res.send("notImplemented: getOne");
};

exports.getAll = async (req, res) => {
  const { email } = req.query;
  const tickets = await ticketQueries.findAll({ email });
  res.send(tickets);
};

exports.createOne = async (req, res) => {
  //TODO: projectId should come from params/path
  const { title, description, dueDate, projectId, usersToConnect } = req.body;
  const ticket = await ticketQueries.create({
    title,
    description,
    dueDate,
    projectId,
    usersToConnect,
  });
  res.send(ticket);
};


