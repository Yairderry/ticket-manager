const express = require("express");
const Ticket = require("./models/ticket");

const app = express();

app.use(express.static("client/build"));

app.get("/api/tickets", (req, res) => {
  Ticket.find().then((data) => {
    res.json(data);
  });
});

module.exports = app;
