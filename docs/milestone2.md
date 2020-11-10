# Milestone 2

# [Heroku App](https://fitnessss-app.herokuapp.com/)

## Division Of Labor

### Todd Dvorsky

- Diet page,
  Workout page,
  Setup express app,
  Docs,
  Deployed app,

### Patrick Kelley

- Social page,
Profile page,
setup express app,
MD milestone description

### Jason Bolton

- 

## API Description
This app uses Express.js for the API. There are four separate route files, one for each type of data. 
## User Endpoints

### GET '/'
Get a specific user
### POST '/create'
Create a user
### PUT /update/:user
Update a user 
### DELETE '/delete/:user'
Delete a user

## Diet Endpoints
### GET '/allDiets'
Get all diets
### GET '/recipes'
Get all recipes
### GET '/:diet'
Get a specific diet
### GET '/recipes/:recipe'
Get a specific recipe
### POST '/create'
Create a diet
### POST '/recipe/create'
Create a recipe
### PUT '/update/:diet'
Update a diet
### PUT '/recipes/update/:recipe'
Update a recipe
### DELETE '/delete/:diet'
Delete a diet
### DELETE '/recipe/delete/:recipe'
Delete a recipe

## Workout Endpoints
### GET '/allWorkouts'
Get all workouts
### GET '/exercises'
Get all exercises
### GET '/:workout'
Get a specific workout
### GET '/exercises/:exercise'
Get a specific exercise
### GET '/create'
Create a workout
### POST '/exercise/create'
Create an exercise
### PUT '/update/:workout'
Update a workout
### PUT '/exercises/update/:exercise'
Update an exercise
### DELETE '/delete/:workout'
Delete a workout
### DELETE '/exercise/delete/:exercise'
Delete a exercise



## Data Example

```javascript
user: {
    userId : '',
    firstName : '',
    lastName : '',
    email : ''
    password : '',
    friends : {
        ids : []
    }
    diets : {},
    workouts :{},
}

workouts: {
    exercises: []
}

diets: {
    recipes: []
}

exercises: {
    name:
    desc:
    sets:
    reps:
}

recipes: {
    name:
    desc:
    ingredients:
}
```



## Screenshots

### Login Page

![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/login.png)
This is the page people will begin at to log into their accounts or create a new one. Authentication will be implemented.

### Home Page

![Home Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/home.png)
This is a rough home page that has relative links to the other pages of the website. It will mostly just be a welcome page otherwise.

### Diet Page

![Diet Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/diets.png)
This page allows you to input any diet you customize yourself. You can click the browse diets button to look for new diets that you can choose for yourself. These chosen diets will show up in the diet dropdown or on your profile page.

### Browse Diet Page

![Browse Diet Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/browse_diets.png)
This is the browse diet page to pick a pre-made diet you like, or to draw inspiration to create your own diet! You can also see the diets you have already chosen to keep for yourself

### Workout Page

![Workout Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/workouts.png)
This is a similar page to the diet page except for workouts. You can customize your own workouts that you will be able to set for yourself for the week/days ahead. Press the browse workout button to look for pre-made workouts.

### Browse Workouts Page

![Browse Workouts Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/browse_workouts.png)
This is the page to look for pre-made workout that you can choose to display for yourself or keep for a future time.

### Social Page

![Social Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/socialUpdated.png)
This updated social page provides a friends list to choose whose data you want to view, the option to add friends, and the option to delete friends at the bottom. Update functions are used when friends are added, Read functions are used to populate the data from the specific users, and Delete functions are used when deleting the person whose profile you're currently viewing.

### Profile Page #1

![Profile Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/profile_1.png)
This is the top half of the profile page. You will have some general information and favorites show up here, as well as some personal information like your age, weight goals, and location if you wish. If you are new to the site, you will be brought to the changing profile section to and use Create functions to create new users for the app. Read functions will be used to populate the html elements, Update functions are used to update existing data when changing your profile or workout plan, and Delete functions are interweaved with the updates.

### Profile Page #2

![Profile Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/profile_2.png)
This is the bottom half of your profile page. Here your current workout and diet will be shown with pictures and recipes, as well as a workout description. You can choose what day of the week it shows so you can see what you've done/eaten, will do/eat, and what you should do/eat that day. The button at the bottom will allow you to change this information and input completely new information which will be populated and updated according to the description above.

### About Page

![About Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/about.png)
This is an about page to describe to users how the website came to be, who created it, and our goals/plans for the website!
