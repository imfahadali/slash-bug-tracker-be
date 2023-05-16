exports.upload = async (profile) => {
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
