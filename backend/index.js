const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

const router = require("./router/router.js");

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../database.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

app.use(bodyParser.json());
app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use("/api/v1", router);

app.use("/media", express.static("../media"))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})