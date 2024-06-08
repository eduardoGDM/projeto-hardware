const { Router } = require("express");
const router = Router();

const mysqlConnection = require("../database/database");

router.get("/", (req, res) => {
  res.status(200).json("Server on port 8000 and database is connect");
});

router.get("/:users", (req, res) => {
  mysqlConnection.query("SELECT * FROM USER;", (error, rows, fields) => {
    if (!error) {
      res.json(rows);
    } else {
      console.log(error);
    }
  });
});

router.get("/:users/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "select * from user where id = ?;",
    [id],
    (error, rows, fields) => {
      if (!error) {
        res.json(rows);
      } else {
        console.log(error);
      }
    }
  );
});

router.post("/:users", (req, res) => {
  const {
    id,
    username,
    name,
    lastname,
    mail,
    randomstr,
    hash,
    latitude,
    longitude,
  } = req.body;
  console.log(req.body);
  mysqlConnection.query(
    "insert into user(id,username,name,lastname,mail,randonmstr,hash,latitude,longitude) values(?,?,?,?,?,?,?);",
    [id, username, name, lastname, mail, randomstr, hash, latitude, longitude],
    (error, rows, fields) => {
      if (!error) {
        res.json({ Statos: "User Saved" });
      } else {
        console.log(error);
      }
    }
  );
});

router.put("/:users/:id", (req, res) => {
  const { id, username, name, lastname, mail, randomstr, hash } = req.body;
  console.log(req.body);
  mysqlConnection.query(
    "update user set username = ?,name = ?, lastname = ?, mail=? randomstr = ?, hash = ? where id = ? ",
    [username, name, lastname, mail, randomstr, hash, id],
    (error, rows, fields) => {
      if (!error) {
        req, json({ Status: "User Update" });
      } else {
        console.log(error);
      }
    }
  );
});

router.delete("/:users/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "delete from user where id = ?;",
    [id],
    (error, rows, fields) => {
      if (!error) {
        res.json({ Status: "User deleted" });
      } else {
        res.json({ Status: error });
      }
    }
  );
});

module.exports = router;
