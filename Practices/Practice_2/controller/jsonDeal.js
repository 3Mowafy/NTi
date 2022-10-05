const fileSystem = require("fs");
readFromJSON = (fileName = data.json) => {
    let res;
    try {
        res = JSON.parse(fileSystem.readFileSync(fileName));
    } catch (e) {
        res = [];
    }
    return res;
};
writeOnJSON = (data, fileName = data.json) => {
    fileSystem.writeFileSync(fileName, JSON.stringify(data));
};
module.exports = {
    readFromJSON,
    writeOnJSON,
};
