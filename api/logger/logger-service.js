const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var db = new sqlite3.Database(`${process.env.PWD}/api/logger/dados.db`, (err) => {
    if (err) {
        console.log('ERRO: Unable to connect to SQLite!');
        throw err;
    }
    console.log('Connected to SQLite!');
});

db.run(`CREATE TABLE IF NOT EXISTS logs 
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tempC VARCHAR NOT NULL,
        tempF VARCHAR NOT NULL,
        datetime VARCHAR NOT NULL,
        offLimit BOOLEAN NOT NULL
    )`,
    [], (err) => {
        if (err) {
            console.log("Error: Unable to create table logs!");
            throw err;
        }
}); 

app.get('/logs', (req, res, next) => {
    db.all(`SELECT * FROM logs ORDER BY id DESC LIMIT 8`, (err, result) => {
        var formatedResult = {temp:[], time:[]};
        if (err) {
            console.log("Error: " + err);
            return res.status(500).send("Error retrieving logs");
        } else if (result === null || result.length == 0) {
            console.log("No content");
            return res.status(204).send("No content.")
        } else {
            for (logs in result) {
                formatedResult.temp.push(result[logs].tempC);
                formatedResult.time.push(result[logs].datetime.slice(-8, -3));
            }
            formatedResult.temp.reverse();
            formatedResult.time.reverse();
            return res.status(200).json(formatedResult);
        }
    });
});

app.post("/logs", (req, res, next) => {
    const tempC = req.body.tempC;
    const offLimit = req.body.offLimit;
    const tempF = (tempC*1.8)+32
    db.run(`INSERT INTO logs (tempC, tempF, datetime, offLimit) VALUES(?, ?, datetime('now', 'localtime'), ?)`, [tempC, tempF, offLimit], err => {
        if (err) {
            console.log("Error: "+ err);
            return res.status(500).send("Error registering log!");
        } else {
            console.log("Successfully registered log!");
            return res.status(200).send("Successfully registered log!");
        }
    })
});

let port = 8091;
app.listen(port, () => {
 console.log('Server running on port: ' + port);
});