const json = require("./jsonDeal.js");

const fileName = "data.json";

const add = (data) => {
    const myData = json.readFromJSON(fileName);
    const oldTitle = myData.findIndex((e) => e.title == data.title);
    if (oldTitle != -1) {
        console.log("title is Not Recommended");
    } else {
        myData.push(data);
        json.writeOnJSON(myData, fileName);
    }
};

const showAll = () => {
    const show = json.readFromJSON(fileName);
    if (!show.length) return console.log("No Data");
    show.forEach((e) => {
        console.log(`
id: ${e.id},
title: ${e.title},
body: ${e.body},
        `);
    });
};

const showSingle = (id) => {
    const show = json.readFromJSON(fileName);

    show.forEach((e) => {
        if (id == e.id) console.log(e);
    });
};
const edit = (id, title, body) => {
    const show = json.readFromJSON(fileName);
    const editTask = show.findIndex((e) => e.id == id);
    if (editTask != -1) {
        show[editTask].title = title;
        show[editTask].body = body;
        json.writeOnJSON(show, fileName);
    }
};
const del = (id) => {
    const show = json.readFromJSON(fileName);
    const delTask = show.findIndex((e) => e.id == id);
    if (delTask != -1) {
        show.splice(delTask, 1);
        json.writeOnJSON(show, fileName);
    }
};

const addComment = (id, comment) => {
    const myData = json.readFromJSON(fileName);
    const commentTitle = myData.findIndex((e) => e.id == id);
    const oldContent = myData[commentTitle].comments.findIndex(
        (e) => e.content == comment.content
    );

    if (commentTitle != -1) {
        if (oldContent != -1) {
            console.log("Comment Not Recomended");
        } else {
            myData[commentTitle].comments.push(comment);
            json.writeOnJSON(myData, fileName);
        }
    }
};

module.exports = {
    add,
    showAll,
    showSingle,
    edit,
    del,
    addComment,
};
