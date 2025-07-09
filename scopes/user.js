module.exports = UserScope = (db) => {
  db.User.addScope("includeRole", (query) => ({
    include: [
      {
        model: db.Role,
        attributes: ["name", "subName"],
        ...(query && Object.keys(query).length ? { where: query } : {}),
      },
    ],
  }));
};
