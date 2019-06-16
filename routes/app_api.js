const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const exphbs = require("handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "menny"
});

router.get("/", (req, res) => {
  console.log("get all members");
  res.send("kuku");
});

router.get("/languages/branch=:branch_id", (req, res) => {
  connection.query(
    "select distinct(l._id), l.name from branches b, menus m, categories c, dishes d, dishes_tr dtr, languages l\
    where b.menu_id = m._id\
    and m._id = c.menu_id\
    and c._id = d.category_id\
    and d._id = dtr.dish_id\
    and dtr.language_id = l._id\
    and b._id = ?\
    GROUP by l._id\
    UNION\
    select l._id, l.name from languages l, branches b, clients cl\
    where b.client_id = cl._id\
    and cl.default_language_id = l._id\
    and b._id = ?",
    [req.params.branch_id, req.params.branch_id],
    (error, results, fields) => {
      if (error) {
        res.json(error);
      } else {
        res.json(results);
      }
    }
  );
});

router.get("/branch/branch=:branch_id", (req, res) => {
  connection.query(
    "select c._id as client_id, c.name as client_name, c.description as client_description, b.name as branch_name, b.description as branch_description, m.name as menu_name, m.description as menu_description from clients c, branches b, menus m where c._id=b.client_id and m._id = b.menu_id and b._id = ?",
    [req.params.branch_id],
    (error, results, fields) => {
      if (error) {
        res.json(error);
      } else {
        res.json(results[0]);
      }
    }
  );
});

exphbs.registerHelper("generateMenu", function(items) {
  var out = "<div class='container'>";
  out += `<a class="btn btn-dark mb-2 mt-2" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-globe"></i></a>`;
  const map = new Map();
  let categories = [];
  let dishes;
  for (const item of items) {
    if (!map.has(item.category_id)) {
      map.set(item.category_id, true); // set any value to Map
      categories.push({
        category_id: item.category_id,
        category_name: item.category_name
      });
    }
  }
  for (const category of categories) {
    out +=
      '<div class="alert alert-primary" role="alert"><h3>' +
      category.category_name +
      "</h3></div>";
    out += '<ul class="list-group">';
    dishes = items.filter(p => p.category_id == category.category_id);
    for (const dish of dishes) {
      out += '<li class="list-group-item">';
      out += "<h4>" + dish.dish_name + " (" + dish.dish_price + ")</h4>";
      out += "<h5>" + dish.dish_description + "</h5>";
      out += "</li>";
    }
    out += "</ul>";
  }
  return new exphbs.SafeString(out);
});

exphbs.registerHelper("findByValue", function(options) {
  console.log(options);
});

module.exports = router;
