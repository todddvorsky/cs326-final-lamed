'use strict';
const express = require('express');
const app = express();
app.use(express.json()); // lets you handle JSON input
const port = 8080;
const dietFuncs = require('./api/diets.js');

app.use('/', express.static('./src/views'));
app.get('/social.html', dietFuncs.handleGetDiets);

app.get('*', (req, res) => {
    res.send('NO FOOL');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});