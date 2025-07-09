const db = require("../models");

exports.showAllProcedure = "SHOW PROCEDURE STATUS WHERE Db = 'testdb';";

exports.createTotalTutorial =
  "CREATE PROCEDURE tutorialTotal (id integer) BEGIN select id, name, description, published, charge, days, charge*days as total from tutorials as tutorial where id=id; END";

exports.procedureList = [
  { title: "tutorialTotal", query: this.createTotalTutorial },
];
