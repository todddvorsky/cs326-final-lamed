'use strict';

module.exports = {
  handleGetUsers: function(req, res){
    res.send('get all of the Users');
  },

  handleGetUserId: function(req, res){
    res.send('get a user with a specific Id');
  },

  handleGetUsersFriends: function(req, res){
    res.send('get a specific users friends');
  },  

  handleCreateUser: function(req, res){
    res.send('Post the creation of a new user with a new ID');
  },

  handleUpdateUser: function(req, res){
    res.send('Look up the user and update the info specified');
  },

  handleDeleteUser: function(req, res){
    res.send('Delete user with a specific ID from the database');
  },

  handleDeleteUsersDiet: function(req, res){
    res.send('Delete a specified diet from the user');
  },

  handleDeleteUsersWorkout: function(req, res){
    res.send('Delete a specified workout from the user');
  }
}
