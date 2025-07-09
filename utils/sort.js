exports.getSort = (sort) => {
  return sort ? sort.split(",") : ["updatedAt", "desc"];
};
