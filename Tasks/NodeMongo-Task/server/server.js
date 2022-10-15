const express = require("express");
const hbs = require("hbs");
const path = require("path");

require("dotenv").config();

const server = express();

server.use(express.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, "../client/static")));

server.set("view engine", "hbs");
server.set("views", path.join(__dirname, "../client/dynamic"));

hbs.registerPartials(path.join(__dirname, "../client/layouts"));

hbs.registerHelper("++", (val) => {
    return val + 1;
});

const routeTasks = require("./routes/task.routes");
server.use(routeTasks);

server.all("*", (req, res) => {
    res.render("error", {
        pageTitle: "Page Not Found",
    });
});

module.exports = server;
