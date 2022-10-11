const express = require("express");
const hbs = require("hbs");
const path = require("path");

require("dotenv").config();

const server = express();
const PORT = process.env.PORT;

const staticFiles = path.join(__dirname, "front-end/static");
const dynamicFiles = path.join(__dirname, "front-end/dynamic");
const layoutFiles = path.join(__dirname, "front-end/layouts");

server.use(express.urlencoded({ extended: true }));
server.use(express.static(staticFiles));
server.set("view engine", "hbs");
server.set("views", dynamicFiles);
hbs.registerPartials(layoutFiles);

const route = require("./server/routes/cust.routes");
server.use(route);

server.all("*", (req, res) => {
    res.send("Page Not Found");
});

server.listen(PORT, () => console.log(`GO TO http://127.0.0.1:${PORT}`));
