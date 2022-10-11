const deal = require("../controller/deal");
const dbFile = "server/db/data.json";

const home = (req, res) => {
    const allCustomers = deal.readFromJson(dbFile);
    res.render("home", {
        pageTitle: "BANK",
        allCustomers,
    });
};

const add = (req, res) => {
    res.render("add", {
        pageTitle: "Add Customer",
    });
};

const addCust = (req, res) => {
    const cust = {
        id: Date.now(),
        name: req.query.name,
        init: req.query.init,
        balance: req.query.init,
        opreations: [],
    };
    const allCustomers = deal.readFromJson(dbFile);
    allCustomers.push(cust);
    deal.writeToJson(allCustomers, dbFile);
    res.redirect("/");
};

const show = (req, res) => {
    let isFound = true;
    const CustId = req.params.id;
    const allCustomers = deal.readFromJson(dbFile);
    const cust = allCustomers.find((u) => u.id == CustId);
    if (!cust) isFound = false;
    res.render("single", {
        pageTitle: "Single Customer",
        cust,
        isFound,
    });
};

const addBalance = (req, res) => {
    const CustId = req.params.id;
    const allUsers = deal.readFromJson(dbFile);
    const cust = allUsers.find((u) => u.id == CustId);
    if (cust == -1) res.redirect("/");
    res.render("addBalance", {
        pageTitle: "Add Balance",
        cust,
    });
};

const addLogic = (req, res) => {
    const custId = req.params.id;
    const allCustomers = deal.readFromJson(dbFile);
    const cust = allCustomers.findIndex((u) => u.id == custId);
    allCustomers[cust].balance = +allCustomers[cust].balance + +req.body.add;
    allCustomers[cust].opreations.push({ op: "add", val: req.body.add });
    deal.writeToJson(allCustomers, dbFile);
    res.redirect("/");
};

const remainBalance = (req, res) => {
    const CustId = req.params.id;
    const allUsers = deal.readFromJson(dbFile);
    const cust = allUsers.find((u) => u.id == CustId);
    if (cust == -1) res.redirect("/");
    res.render("remain", {
        pageTitle: "Remain Balance",
        cust,
    });
};

const remainLogic = (req, res) => {
    const custId = req.params.id;
    const allCustomers = deal.readFromJson(dbFile);
    const cust = allCustomers.findIndex((u) => u.id == custId);
    allCustomers[cust].balance = +allCustomers[cust].balance - +req.body.remain;
    allCustomers[cust].remain = +allCustomers[cust].balance;
    deal.writeToJson(allCustomers, dbFile);
    res.redirect("/");
};

module.exports = {
    home,
    add,
    addCust,
    show,
    addBalance,
    addLogic,
    remainBalance,
    remainLogic,
};
