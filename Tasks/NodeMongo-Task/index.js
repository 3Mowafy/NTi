const server = require("./server/server");
const PORT = process.env.PORT;

server.listen(PORT, () =>
    console.log(`Click On Link To View Your Server http://127.0.0.1:${PORT}`)
);
