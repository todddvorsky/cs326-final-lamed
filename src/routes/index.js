'use strict';
const express = require('express');
const app = express();
app.use(express.json()); // lets you handle JSON input
const port = 8080;
let datastore = {};

app.use('/', express.static('./src/views'));

//   curl -d '{ "value" : "12" }' -H "Content-Type: application/json" http://localhost:3000/read/x
app.get('/create', (req, res) => {
    const k = req.query.key;
    const v = req.query.value;
    datastore[k] = v;
    console.log(`Set ${k} to ${v}`);
    res.send('Set.');
});
app.get('/read', (req, res) => {
    const k = req.query.key;
    const v = datastore[k];
    res.send(`key = ${k}, value = ${v}`);
});
app.get('/read/:key', (req, res) => {
    const k = req.params['key'];
    const v = datastore[k];
    res.send(`key = ${k}, value = ${v}`);
});
//   curl -d '{ "key" : "x", "value" : "12" }' -H "Content-Type: application/json" http://localhost:3000/pcreate
app.post('/pcreate', (req, res) => {
    const k = req.body["key"];
    const v = req.body["value"];
    datastore[k] = v;
    console.log(`Set ${k} to ${v}, body = ${JSON.stringify(req.body)}`);
    res.send('Set.');
});
app.get('*', (req, res) => {
    res.send('NO FOOL');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});