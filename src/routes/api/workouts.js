var router = require('express').Router();

export function handleGetWorkouts(req, res){
  console.log('get all of the workouts');
}

export function handleGetWOId(req, res){
  console.log('get the workout with the specific Id');
}

export function handleGetExercises(req, res){
  console.log('get all of the exercises');
}

export function handleGetExerciseId(req, res){
  console.log('get the exercise with a specific Id');
}

export function handleGetExerciseTags(req, res){
  console.log('Get a list of exercises with the specific tag');
}

export function handleCreateWO(req, res){
  console.log('Create a new Workout with the specified fields');
}

export function handleCreateExercise(req, res){
  console.log('Create a new Exercise with the specified fields');
}

export function handleUpdateWO(req, res){
  console.log('update a WO with the specified fields');
}

export function handleUpdateExercise(req, res){
  console.log('update an exercise with the specified fields');
}

export function handleDeleteWO(req, res){
  console.log('delete a specified Workout');
}

export function handleDeleteExercise(req, res){
  console.log('delete a specified exercise');
}

export function handleDeleteExerciseFromWO(req, res){
  console.log('Delete a specified exercise from a Workout');
}