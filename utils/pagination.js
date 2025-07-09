exports.getPagination = (page, size) => {
  page = Number(page);
  size = Number(size);
  page = page ? page : 1;
  size = size ? size : 10;
  const limit = size;
  const offset = page ? (page - 1) * limit : 0;
  const currentPage = page ? +page : 1;
  return { limit, offset, currentPage };
};
