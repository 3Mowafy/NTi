const ObjectId = require("mongodb").ObjectId;
const connect = require("../db/data");
const hbs = require("hbs");

class Tasks {
    static home = (req, res) => {
        connect(async (err, db) => {
            if (err)
                res.render("error", { pageTitle: "Tasks - Page Not Found" });
            try {
                const Tasks = await db.collection("Tasks").find().toArray();
                res.render("home", {
                    pageTitle: "Tasks - Home Page",
                    Tasks,
                });
            } catch (e) {
                if (e)
                    res.render("error", {
                        pageTitle: "Tasks - Data Base Not Connected",
                    });
            }
        });
    };

    static add = (req, res) => {
        res.render("add", {
            pageTitle: "Tasks - Add New User",
        });
    };

    static addTask = (req, res) => {
        connect(async (err, db) => {
            if (err)
                res.render("error", { pageTitle: "Tasks - Page Not Found" });
            try {
                let info = req.body;
                const today = new Date();
                today.setDate(today.getDate() + 1);
                const date = today.toLocaleDateString();
                req.body.status
                    ? (req.body.status = true)
                    : (req.body.status = false);
                const data = await db
                    .collection("Tasks")
                    .findOne({ title: req.body.title });
                data ||
                req.body.title == "" ||
                req.body.content == "" ||
                req.body["due-date"] == ""
                    ? res.render("error", {
                          pageTitle: "Tasks - Page Not Found",
                          message: "Write Your Data Or Change iT",
                      })
                    : (await db
                          .collection("Tasks")
                          .insertOne({ duedate: date, ...info })) &&
                      res.redirect("/");
            } catch (e) {
                if (e)
                    res.render("error", {
                        pageTitle: "Tasks - Data Base Not Connected",
                    });
            }
        });
    };

    static delete = (req, res) => {
        connect(async (err, db) => {
            if (err)
                res.render("error", { pageTitle: "Tasks - Page Not Found" });
            try {
                await db
                    .collection("Tasks")
                    .deleteOne({ _id: new ObjectId(req.params) });
                res.redirect("/");
            } catch (e) {
                if (e)
                    res.render("error", {
                        pageTitle: "Tasks - Data Base Not Connected",
                    });
            }
        });
    };

    static edit = (req, res) => {
        connect(async (err, db) => {
            if (err)
                res.render("error", { pageTitle: "Tasks - Page Not Found" });
            try {
                const data = await db
                    .collection("Tasks")
                    .findOne({ _id: ObjectId(req.params) });
                res.render("edit", {
                    pageTitle: "Tasks - Edit Current User",
                    data,
                });
            } catch (e) {
                if (e)
                    res.render("error", {
                        pageTitle: "Tasks - Data Base Not Connected",
                    });
            }
        });
    };

    static editTask = (req, res) => {
        connect(async (err, db) => {
            if (err)
                res.render("error", { pageTitle: "Tasks - Page Not Found" });
            try {
                req.body.status
                    ? (req.body.status = true)
                    : (req.body.status = false);
                await db.collection("Tasks").updateOne(
                    { _id: new ObjectId(req.params) },
                    {
                        $set: {
                            title: req.body.title,
                            content: req.body.content,
                            "due-date": req.body["due-date"],
                            status: req.body.status,
                        },
                    }
                );
                res.redirect("/");
            } catch (e) {
                if (e)
                    res.render("error", {
                        pageTitle: "Tasks - Data Base Not Connected",
                    });
            }
        });
    };

    static show = (req, res) => {
        connect(async (err, db) => {
            if (err)
                res.render("error", { pageTitle: "Tasks - Page Not Found" });
            try {
                const Task = await db
                    .collection("Tasks")
                    .findOne({ _id: new ObjectId(req.params) });
                res.render("single", {
                    pageTitle: `Tasks - ${Task.title}`,
                    Task,
                });
            } catch (e) {
                if (e)
                    res.render("error", {
                        pageTitle: "Tasks - Data Base Not Connected",
                    });
            }
        });
    };
}

module.exports = Tasks;
