import Express = require("express");

const app = Express();

app.get("/", (req, res) => {
    res.json("Hello World!");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});