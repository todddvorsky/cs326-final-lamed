'use strict';

module.exports = {
  handleGetDiets: function(req, res){
    res.send('get all of the diets');
  },

  handleGetDietId: function(req, res){
    res.send('get the diet with the specific Id');
  },

  handleGetRecipes: function(req, res){
    res.send('get all of the recipes');
  },

  handleGetRecipeId: function(req, res){
    res.send('get the recipe with a specific Id');
  },

  handleGetRecipeTags: function(req, res){
    res.send('Get a list of recipes with the specific tag');
  },

  handleCreateDiet: function(req, res){
    res.send('Create a new diet with the specified fields');
  },

  handleCreateRecipe: function(req, res){
    res.send('Create a new Recipe with the specified fields');
  },

  handleUpdateDiet: function(req, res){
    res.send('update a diet with the specified elements');
  },

  handleUpdateRecipe: function(req, res){
    res.send('update a recipe with the specified elements');
  },

  handleDeleteDiet: function(req, res){
    res.send('delete a specified diet');
  },

  handleDeleteRecipe: function(req, res){
    res.send('delete a specified recipe');
  },

  handleDeleteRecipeFromDiet: function(req, res){
    res.send('Delete a specified recipe from a diet');
  },
}
