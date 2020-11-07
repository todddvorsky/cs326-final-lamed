//const express = require('express');
//const router = express();

exports.handleGetDiets = function(req, res){
  console.log('get all of the diets');
}

function handleGetDietId(req, res){
  console.log('get the diet with the specific Id');
}

function handleGetRecipes(req, res){
  console.log('get all of the recipes');
}

function handleGetRecipeId(req, res){
  console.log('get the recipe with a specific Id');
}

function handleGetRecipeTags(req, res){
  console.log('Get a list of recipes with the specific tag');
}

function handleCreateDiet(req, res){
  console.log('Create a new diet with the specified fields');
}

function handleCreateRecipe(req, res){
  console.log('Create a new Recipe with the specified fields');
}

function handleUpdateDiet(req, res){
  console.log('update a diet with the specified elements');
}

function handleUpdateRecipe(req, res){
  console.log('update a recipe with the specified elements');
}

function handleDeleteDiet(req, res){
  console.log('delete a specified diet');
}

function handleDeleteRecipe(req, res){
  console.log('delete a specified recipe');
}

function handleDeleteRecipeFromDiet(req, res){
  console.log('Delete a specified recipe from a diet');
}