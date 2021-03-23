const express = require("express");
const Ticket = require("./models/ticket");

const app = express();

app.use(express.static("client/build"));

app.get("/api/tickets", (req, res) => {
  const { searchText } = req.query;
  Ticket.find({ title: new RegExp(searchText, "gi") }).then((data) => {
    res.json(data);
  });
});

module.exports = app;
