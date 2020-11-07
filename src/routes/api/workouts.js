'use strict';

module.exports = {
  handleGetWO: function(req, res){
    res.send('get all of the workouts');
  },

  handleGetWOId: function(req, res){
    res.send('get the workout with the specific Id');
  },

  handleGetExercises: function(req, res){
    res.send('get all of the exercises');
  },

  handleGetExerciseId: function(req, res){
    res.send('get the exercise with a specific Id');
  },

  handleGetExerciseTags: function(req, res){
    res.send('Get a list of exercises with the specific tag');
  },

  handleCreateWO: function(req, res){
    res.send('Create a new workout with the specified fields');
  },

  handleCreateExercise: function(req, res){
    res.send('Create a new exercise with the specified fields');
  },

  handleUpdateWO: function(req, res){
    res.send('update a workout with the specified elements');
  },

  handleUpdateExercise: function(req, res){
    res.send('update an exercise with the specified elements');
  },

  handleDeleteWO: function(req, res){
    res.send('delete a specified workout');
  },

  handleDeleteExercise: function(req, res){
    res.send('delete a specified exercise');
  },

  handleDeleteExerciseFromWO: function(req, res){
    res.send('Delete a specified exercise from a workout');
  },
}