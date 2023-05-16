const projectQueries = require("../queries/project");

exports.getOne = async (req, res) => {
  const { id: projectId } = req.params;
  // res.send(projectId)
  const project = await projectQueries.findOne(projectId);

  res.send(project);
};

exports.getAll = async (req, res) => {
  const allProjects = await projectQueries.findAll();

  res.send(allProjects);
};

exports.createOne = async (req, res) => {
  const { title, description, priority, authorsToConnect, ticketsToCreate } =
    req.body;

  const project = await projectQueries.create({
    title,
    description,
    priority,
    authorsToConnect,
    ticketsToCreate,
  });

  res.send(project);
};

exports.updateOne = async (req, res) => {
  const {
    title,
    description,
    priority,
    authorsToDisconnect,
    authorsToConnect,
    ticketsToDelete,
    ticketsToCreate,
  } = req.body;
  const { id: projectId } = req.params;
  const project = await projectQueries.update({
    projectId,
    title,
    description,
    priority,
    authorsToDisconnect,
    authorsToConnect,
    ticketsToDelete,
    ticketsToCreate,
  });
  res.send(project);
};

exports.deleteAll = async (req, res)=> {
  const projects = await projectQueries.deleteAll()
  res.send(projects)
}

exports.deleteOne = async (req, res) => {
  const { id: projectId } = req.params;
  console.log(projectId)
  const project = await projectQueries.deleteOne(projectId);
  res.send(project);
};