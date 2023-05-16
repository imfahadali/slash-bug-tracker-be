const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.findOne = async (ticketId) => {
  return await prisma.ticket.findUnique({
    where: {
      id: parseInt(ticketId),
    },
    include: {
      project: true,
      tickets: true,
    },
  });
};

exports.findAll = async ({ email }) => {
  return await prisma.ticket.findMany({
    where: !!email
      ? {
          users: {
            some: {
              email: email,
            },
          },
        }
      : {},
    include: {
      project: true,
      users: true,
    },
  });
};

exports.create = async ({ title, description, dueDate, usersToConnect }) => {
  return await prisma.ticket.create({
    data: {
      title,
      description,
      dueDate: new Date(),
      project: {
        connect: { id: 1 },
        connect: usersToConnect,
      },
    },
    include: {
      project: true,
      users: true,
    },
  });
};

// exports.delete = async (userId) => {
//   return await prisma.ticket.delete({
//     where: {
//       userId: parseInt(userId),
//     },
//     include: {
//       project: true,
//       assignedTickets: true,
//     },
//   });
// };

// exports.update = async ({ ticketsToConnect }) => {
//   console.log(ticketsToDelete);
//   //   return await prisma.ticket.update({
//   //     where: {
//   //       id: 1,
//   //     },
//   //     data: {
//   //       assignedTickets: {
//   //         connect: [{ ticket: { connect: { id: ticketsToConnect } } }],
//   //       },
//   //     },
//   //     include: { assignedTickets: { include: { ticket: true } } },
//   //   });
// };
