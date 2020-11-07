var express = require('express');
var router = express.Router();

export function handleGetUsers(req, res){
  console.log('get all of the Users');
}

export function handleGetUserId(req, res){
  console.log('get a user with a specific Id');
}

export function handleGetUsersFriends(req, res){
  console.log('get a specific users friends');
}

export function handleCreateUser(req, res){
  console.log('Post the creation of a new user with a new ID');
}

export function handleUpdateUser(req, res){
  console.log('Look up the user and update the info specified');
}

export function handleDeleteUser(req, res){
  console.log('Delete user with a specific ID from the database');
}

export function handleDeleteUsersDiet(req, res){
  console.log('Delete a specified diet from the user');
}

export function handleDeleteUsersWorkout(req, res){
  console.log('Delete a specified workout from the user');
}
