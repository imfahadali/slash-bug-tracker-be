const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.findAll = async () => {
  return await prisma.user.findMany({
    include: {
      project: false,
      tickets: true,
    },
  });
};

exports.findUnassigned = async () => {
  return await prisma.user.findMany({
    where: {
      projectId: null,
    },
  });
};

exports.findOne = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      project: true,
      tickets: true,
    },
  });
};

exports.create = async ({ email, name, password, profile }) => {
  //TODO: add hashed password
  return await prisma.user.create({
    data: {
      email,
      name,
      password,
      profile,
    },
    include: {
      project: true,
      tickets: true,
    },
  });
};

exports.delete = async (userId) => {
  return await prisma.user.delete({
    where: {
      id: parseInt(userId),
    },
    include: {
      project: true,
      tickets: true,
    },
  });
};

exports.updateTicket = async ({
  ticketsToConnect,
  ticketsToDisconnect,
  email,
}) => {
  // const userId = 4;

  console.log("ticketsToConnect", ticketsToConnect);
  console.log(ticketsToConnect);
  return await prisma.user.update({
    where: { email },
    data: {
      tickets: { connect: ticketsToConnect, disconnect: ticketsToDisconnect },
    },
    include: {
      tickets: true,
    },
  });
};
