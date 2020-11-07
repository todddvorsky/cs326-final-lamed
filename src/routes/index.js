'use strict';
const express = require('express');
const app = express();
app.use(express.json()); // lets you handle JSON input
const port = 8080;
const dietFuncs = require('./api/diets.js');
const workoutFuncs = require('./api/workouts.js');
const userFuncs = require('./api/users.js');

//serves the static html files
app.use('/', express.static('./src/views'));

//endpoints for diets
app.get('/diets', dietFuncs.handleGetDiets);
app.get('/diets/:id', dietFuncs.handleGetDietId);
app.get('/diets/recipes', dietFuncs.handleGetRecipes);
app.get('/diets/recipes/:id', dietFuncs.handleGetRecipeId);
app.get('/diets/recipes/:tag', dietFuncs.handleGetRecipeTags);
app.post('/diets/create', dietFuncs.handleCreateDiet);
app.post('/diets/recipe/create', dietFuncs.handleCreateRecipe);
app.put('/diets/update', dietFuncs.handleUpdateDiet);
app.put('/diets/recipes/update', dietFuncs.handleUpdateRecipe);
app.delete('/diets/delete/:id', dietFuncs.handleDeleteDiet);
app.delete('/diets/recipe/delete/:id', dietFuncs.handleDeleteRecipe);
app.delete('/diets/deleteRecipe/:id', dietFuncs.handleDeleteRecipeFromDiet);

//endpoints for workouts
app.get('/WO', workoutFuncs.handleGetWO);
app.get('/WO/:id', workoutFuncs.handleGetWOId);
app.get('/WO/exercise', workoutFuncs.handleGetExercises);
app.get('/WO/exercise/:id', workoutFuncs.handleGetExerciseId);
app.get('/WO/exercise/:tag', workoutFuncs.handleGetExerciseTags);
app.post('/WO/create', workoutFuncs.handleCreateWO);
app.post('/WO/exercise/create', workoutFuncs.handleCreateExercise);
app.put('/WO/update', workoutFuncs.handleUpdateWO);
app.put('/WO/exercise/update', workoutFuncs.handleUpdateExercise);
app.delete('/WO/delete/:id', workoutFuncs.handleDeleteWO);
app.delete('/WO/exercise/delete/:id', workoutFuncs.handleDeleteExercise);
app.delete('/WO/deleteExercise/:id', workoutFuncs.handleDeleteExerciseFromWO);

//endpoints for users
app.get('/users',userFuncs.handleGetUsers);
app.get('/users/:id',userFuncs.handleGetUserId);
app.get('/users/friends',userFuncs.handleGetUsersFriends);
app.get('/users/create',userFuncs.handleCreateUser);
app.get('/users/update',userFuncs.handleUpdateUser);
app.get('/users/delete/:id',userFuncs.handleDeleteUser);
app.get('/users/diets/delete/:id',userFuncs.handleDeleteUsersDiet);
app.get('/users/workouts/delete/:id',userFuncs.handleDeleteUsersWorkout);

app.get('*', (req, res) => {
    res.send('NO FOOL');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});