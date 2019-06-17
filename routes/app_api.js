const express = require("express");
const mysql = require("mysql");
const router = express.Router();

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
    [req.params.branch_id,req.params.branch_id],
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
    "select c._id as client_id, c.name as client_name, c.description as client_description, c.default_language_id as client_default_language,\
    b.name as branch_name, b.description as branch_description,\
    m.name as menu_name, m.description as menu_description\
    from clients c, branches b, menus m where c._id=b.client_id and m._id = b.menu_id and b._id = ?",
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

router.get("/menu/branch=:branch_id/language=:language_id", (req, res) => {
  connection.query(
    "SELECT\
    c._id category_id, d._id dish_id,\
    ctr.name category_name, ctr.description category_description, dtr.name dish_name, dtr.description dish_description, d.price dish_price\
    FROM \
    branches b, branches_tr btr, categories c, categories_tr ctr, dishes d, dishes_tr dtr, menus m, menus_tr mtr, languages l\
    WHERE\
    b.menu_id = m._id\
    and m._id = c.menu_id\
    and c._id = ctr.category_id\
    and c._id = d.category_id\
    and d._id = dtr.dish_id\
    and dtr.language_id = l._id\
    and dtr.language_id = l._id\
    and l._id = ?\
    and b._id = ?",
    [req.params.language_id, req.params.branch_id],
    (error, results, fields) => {
      if (error) {
        res.json(error);
      } else {
        res.json(results);
      }
    }
  );
});

router.get("/menu/branch=:branch_id", (req, res) => {
  connection.query(
    "SELECT\
    c.name category_name, c.description category_description, d.name dish_name, d.description dish_description, d.price dish_price\
    FROM\
    branches b, branches_tr btr, categories c, dishes d, menus m\
    WHERE\
    b.menu_id = m._id\
    and m._id = c.menu_id\
    and c._id = d.category_id\
    and b._id = ?",
    [req.params.branch_id],
    (error, results, fields) => {
      if (error) {
        res.json(error);
      } else {
        res.json(results);
      }
    }
  );
});

module.exports = router;
