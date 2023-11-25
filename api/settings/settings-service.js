const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
console.log(`${process.env.PWD}`)
var db = new sqlite3.Database(`${process.env.PWD}/api/settings/dados.db`, (err) => {
    if (err) {
        console.log('ERRO: Unable to connect to SQLite!');
        throw err;
    }
    console.log('Connected to SQLite!');
});

db.run(`CREATE TABLE IF NOT EXISTS settings 
    (
        upperThreshold VARCHAR NOT NULL,
        bottomThreshold VARCHAR NOT NULL
    )`,
    [], (err) => {
        if (err) {
            console.log("Error: Unable to create table settings!");
            throw err;
        }
}); 

db.all(`SELECT count(*) as c FROM settings`, [], (err, result) => {
    if (err) {
        console.log(err)
    }
    c = result[0].c
    if (c == 0) {
        db.run(`INSERT INTO settings (upperThreshold, bottomThreshold) VALUES(30, 10)`), err => {
            if (err) {
                console.log(err)
            } else {
                console.log("Initial settings done.")
            }
        }
    }
});


app.get('/settings', (req, res, next) => {
    db.all(`SELECT * FROM settings`, (err, result) => {
        if (err) {
            console.log("Erro: "+ err);
            return res.status(500).send("Error retrieving data.")
        } else {
            return res.status(200).json(result);
        }
    });
});

app.patch('/settings', (req, res, next) => {
    const {upperThreshold, bottomThreshold} = req.body;
    if (upperThreshold <= bottomThreshold) {
        return res.status(400).send("Invalid thresholds!")
    }
    db.run(`UPDATE settings SET upperThreshold = ?, bottomThreshold = ?`, [upperThreshold, bottomThreshold], err => {
        if (err) {
            console.log("Error: "+err);
            return res.status(500).send("Error updating settings");
        } else {
            console.log("Settings updated!");
            return res.status(200).send("Settings updated!");
        }
    });
});

let port = 8090;
app.listen(port, () => {
 console.log('Server running on port: ' + port);
});