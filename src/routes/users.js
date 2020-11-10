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
  //send back all users & respectful info, but for now send back array of names to test
  res.json({users: 
    [{userid: 51, name: "Wendy"}, 
    {userid: 43, name: "Grace"},
    {userid: 67, name: "Liam"}]
  });
});

/* GET a specific user. */
router.get('/:user', function(req, res){
  //send back a user with that id and info
  res.json({
    userid: req.params.user, 
    name: "Wendy",
    workout: "HIIT",
    diet: {
      breakfast: "oats",
      lunch: "soup",
      dinner: "salmon"
    }
  });
});

/* Create a user */
router.post('/create', function(req, res){
  //send back the name of the user created just to test the create
  res.json({name: req.name});
});

/* Update a user with this id */
router.post('/update/:user', function(req, res){
  /* update the user info and put it in the db
      but for now send back the name of the user being updated to test.
      Should be able to update any part of the user specified
      by the ID with the body info given*/
  res.json({userid: 65, name: "Pat"});
});

/* Delete a user */
router.delete('/delete/:user', function(req, res){
  //delete the user from the db, for now send back id of user being deleted
  res.json({userid: req.params.user});
});



module.exports = router;