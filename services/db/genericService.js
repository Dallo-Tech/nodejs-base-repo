const { getSort } = require("../../utils/sort");
const { getPagination } = require("../../utils/pagination");
const createError = require("http-errors");
const db = require("../../models");

//bulk create
exports.createBulk = async (model, params) => await model.bulkCreate(params);

//create
exports.create = async (model, params) => {
  Object.keys(params).forEach(
    (key) => params[key] === undefined && delete params[key]
  );
  return await model.create(params);
};

//create if not exist
exports.createOrConnect = async (model, where, defaults) =>
  await model.findOrCreate({ where, defaults });

//get all
exports.getAll = async (model, query = {}, scopes = [], attributes = []) => {
  Object.keys(query).forEach(
    (key) => query[key] === undefined && delete query[key]
  );
  const { sort, page, size, pagination = true, ...rest } = query;

  const sortData = getSort(sort);
  if (pagination) {
    const { limit, offset, currentPage } = getPagination(page, size);
    //pagination with total and current page
    const count = await this.total(model, rest, scopes);
    const data = await model.scope(scopes).findAll({
      where: rest,
      order: [sortData],
      limit: [offset, limit],
      attributes: attributes.length ? [...attributes, "updatedAt"] : null,
    });

    return {
      result: data,
      currentPage,
      totalPage: Math.ceil(count / limit),
      count,
    };
  } else {
    return await model.scope(scopes).findAll({
      where: rest,
      order: [sortData],
      attributes: attributes.length ? [...attributes, "updatedAt"] : null,
    });
  }
};

//total count
exports.total = async (model, filter = {}, scopes = []) =>
  await model.scope(scopes).count({ where: filter });

//get single
exports.get = async (model, filter = {}, scopes = [], attributes = []) =>
  await model.scope(scopes).findOne({
    where: filter,
    attributes: attributes.length ? attributes : null,
  });

exports.getOrThrow = async (
  model,
  filter = {},
  scopes = [],
  attributes = []
) => {
  const response = await model.scope(scopes).findOne({
    where: filter,
    attributes: attributes.length ? attributes : null,
  });
  if (response) {
    return response;
  } else {
    throw createError(
      404,
      `${model.name.charAt(0).toUpperCase() + model.name.slice(1)} Not Found`
    );
  }
};

//update
exports.update = async (model, filter, params) => {
  Object.keys(params).forEach(
    (key) => params[key] === undefined && delete params[key]
  );
  return await model.update(params, { where: filter });
};

//destroy
exports.remove = async (model, filter) =>
  await model.destroy({ where: filter });

//truncate
exports.truncate = async (model, id) => await model.destroy({ truncate: true });
