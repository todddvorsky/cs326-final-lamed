/*var router = require('express').Router();

router.use('/api', require('./api'));

module.exports = router;*/
const express = require('express');
const app = express();
const dietFuncs = require('./api/diets.js');
app.use(express.static('./src/views'));
dietFuncs.d;
app.listen(8080);

//dietFuncs.d