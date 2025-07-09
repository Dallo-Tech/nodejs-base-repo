const Sequelize = require("sequelize");
const dbConfig = require("../config/config");
const { ScopeData } = require("../scopes");
const cls = require("cls-hooked");
const namespace = cls.createNamespace("tutovia");

const { database, username, password, host, dialect } =
  process.env.NODE_ENV === "development"
    ? dbConfig.development
    : dbConfig.production;

Sequelize.useCLS(namespace);
const sequelize = new Sequelize(database, username, password, {
  dialect: dialect,
  host: host,
  logging: false,
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Otp = require("./otp")(sequelize, Sequelize);
db.Role = require("./role")(sequelize, Sequelize);
db.Resource = require("./resource")(sequelize, Sequelize);
db.Permission = require("./permission")(sequelize, Sequelize);
db.RoleResourcePermission = require("./roleResourcePermission")(
  sequelize,
  Sequelize
);

/* ---------------------------- association start --------------------------- */
db.User.belongsTo(db.Role, { foreignKey: { allowNull: false } });

//role resource permission
db.Role.hasMany(db.RoleResourcePermission);
db.RoleResourcePermission.belongsTo(db.Role, {
  foreignKey: { allowNull: false },
});

db.Resource.hasMany(db.RoleResourcePermission);
db.RoleResourcePermission.belongsTo(db.Resource, {
  foreignKey: { allowNull: false },
});

db.Permission.hasMany(db.RoleResourcePermission);
db.RoleResourcePermission.belongsTo(db.Permission, {
  foreignKey: { allowNull: false },
});
//end
/* ---------------------------- association end --------------------------- */

/* ---------------------------- scopes here --------------------------- */
ScopeData(db);

module.exports = db;
