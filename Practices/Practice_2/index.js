const crud = require("./controller/crud.js");

switch (process.argv[2]) {
    case "add":
        const data = {
            id: Date.now(),
            title: process.argv[3],
            body: process.argv[4],
            comments: [],
        };
        crud.add(data);
        break;
    case "showAll":
        crud.showAll();
        break;
    case "showSingle":
        crud.showSingle(process.argv[3]);
        break;
    case "edit":
        crud.edit(process.argv[3], process.argv[4], process.argv[5]);
        break;
    case "del":
        crud.del(process.argv[3]);
        break;
    case "addComment":
        const comment = {
            name: process.argv[4],
            content: process.argv[5],
        };
        crud.addComment(process.argv[3], comment);
        break;
    default:
        console.log("Please Try Again");
}
