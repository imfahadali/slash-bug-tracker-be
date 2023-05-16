const { PrismaClient } = require("@prisma/client");
const util = require("util");

const prisma = new PrismaClient();

exports.findAll = async () => {
  return await prisma.project.findMany({
    include: {
      authors: true,
      tickets: true,
    },
  });
};

exports.findOne = async (projectId) => {
  return await prisma.project.findUnique({
    where: {
      id: parseInt(projectId),
    },
    include: {
      authors: true,
      tickets: {
        include: {
          users: {
            select: { profile: true, email: true },
          },
        },
      },
    },
  });
};

exports.create = async ({
  title,
  description,
  priority,
  authorsToConnect,
  ticketsToCreate,
}) => {
  console.log("ticketsToCreate", ticketsToCreate)
  const tickets = ticketsToCreate?.map((ticket) => {
    console.log(ticket)
    return {
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      dueDate: new Date(ticket.dueDate),
      users: { connect: parseIdTypeToInt(ticket.users) },
    };
  });

  //TODO: Manage the case when  user id doesn't exist
  return await prisma.project.create({
    data: {
      title,
      description,
      priority,
      authors: {
        connect: parseIdTypeToInt(authorsToConnect),
      },
      tickets: {
        create: tickets,
      },
    },
    include: {
      authors: true,
      tickets: true,
    },
  });
};

exports.update = async ({
  projectId,
  title,
  description,
  priority,
  authorsToConnect,
  authorsToDisconnect,
  ticketsToDelete,
  ticketsToCreate,
}) => {
  console.log(ticketsToDelete);
  return await prisma.project.update({
    where: {
      id: parseInt(projectId),
    },
    data: {
      title,
      description,
      priority,
      authors: {
        connect: authorsToConnect,
        disconnect: authorsToDisconnect,
      },
      tickets: {
        deleteMany: ticketsToDelete,
        create: ticketsToCreate,
      },
    },
    include: {
      authors: true,
      tickets: true,
    },
  });
};

exports.deleteAll = async () => {
  await prisma.ticket.deleteMany({});
  return await prisma.project.deleteMany({});
};

exports.deleteOne = async (projectId) => {
  console.log(projectId);
  await prisma.ticket.deleteMany({
    where: {
      projectId: parseInt(projectId),
    },
  });
  console.log("running");
  return await prisma.project.delete({
    where: {
      id: parseInt(projectId),
    },
  });
};

const parseIdTypeToInt = (users) => {
  return users?.map((user) => {
    return {
      id: parseInt(user.id),
    };
  });
};
