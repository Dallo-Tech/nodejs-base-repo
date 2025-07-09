const roleScope = require("./role");
const rrpScope = require("./rrp");
const userScope = require("./user");

exports.ScopeData = (db) => {
  roleScope(db);
  userScope(db);
  rrpScope(db);
};
