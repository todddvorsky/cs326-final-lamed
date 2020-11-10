var router = require('express').Router();

/* set params */
router.param('user', function (req, res, next){
  //TODO
  req.user = "User.";

  next();
});

/* ENDPOINTS -- These are strictly suggestions, feel free to modify */

/* GET all users */
router.get('/', function(req, res, next) {
  res.json({users: ["wendy", "grace", "liam"]});
});
/* GET a specific user. */
router.get('/:user', function(req, res){
  res.send('get user: ' + req.user);
});
/* Create a user */
router.post('/create', function(req, res){
  res.send('create user');
});
/* Update a user */
router.put('/update/:user', function(req, res){
  res.send('update user: ' + req.user);
});
/* Delete a user */
router.delete('/delete/:user', function(req, res){
  res.send('delete user: ' + req.user);
});

module.exports = router;