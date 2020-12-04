# Final Markdown

## Title:
lamed

## Subtitle:
Fit4Fun

## Semester:
Fall 2020

## Overview:
Our web application, Fit4Fun, is a great way to track your weekly workouts and diets.
While using Fit4Fun, you can save your favorite diets, workouts, and even share your favorite
recipes and exercises with other users on the app. Within the app, you can friend other users
of the app, see their current week's workout and diet, and curate your own profile with the 
specific week's workout and diet that you'd like to focus on. Not only is Fit4Fun a great way
to keep track of living a healthy lifestyle, it innovatively combines the social world with
the healthy living world to motivate friends and draw inspiration for your coming week's
lifestyle!!

## Team Members:
Patrick Kelley - pkelley98
Todd Dvorsky - todddvorsky
Jason Bolton - BoltyDawg

## User Interface:

## Login
Here, the user can log into their existing account, or, if they don't have one, can
make one on the left! If you try to login without an existing account, you will
stay on the login screen and be told there is no account with that info. You cannot
get to any other page by changing the URL either, so you are forced to make an
account and log in with that account.
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/final_screenshots/loginPage.png)

## Home
This is just a welcome page and just has a list of all of the other pages you can
go to as well.
![Home Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/final_screenshots/homePage.png)

## Diet
Here you can create a new diet to show up in the "browse diets" page. Fill out all of the input fields in order to make a complete diet. Click the button at the top to go to the "browse diets" page.
![Diet Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/final_screenshots/dietPage.jpg)

## Browse Diets
This page allows you to browse diets input by other users and to save
these diets for own page. You will see the contents of the diet when you click the
diet to get a better sense of whether it fits yourself, and then choose to save it 
under your own profile.
![Browse Diets Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/final_screenshots/browseDietPage.jpg)

## Workout
Here you can create a new workout to show up in the "browse workouts" page. Fill out all of the input fields in order to make a complete workout. Press the button at the top to go to the "browse workouts" page.
![Workout Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/final_screenshots/workoutPage.png)

## Browse Workouts
Again like the browse diets page, this is a page to browse diets from other users and
save them as your own to use in your own profile. Click the workout to get more information about it,
and then save it under your own profile if you like it!
![Browse Workouts Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/final_screenshots/browseWorkoutPage.png)

## Social
This is a page to see what your friends are up to. You can add a friend by inputting
their email. Both users have to input each others email in order to become friends.
When you input your friend's email, you will receive a notification saying whether 
the request was sent, if a request has already been sent, if the friend request is
accepted, or if no user is found with that email. After you become friends, they
will show up in the drop down menu labeled "friends list" and you can see a workout
and diet that they have saved. You can also delete friends by clicking on them in the
friends list and then pressing the "delete friend" button on the bottom of the page.
![Social Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/final_screenshots/socialPage.png)

## Profile
This is where you can display all of your information for yourself to keep track of.
At the top, you can change your name, as well as input other little fun facts about
yourself. Do this by pressing the "update profile" button, and then once everything
looks the way you want, press the "save profile" button. On the bottom half of the 
page, you can set the workout and diet that you'd like to follow for everyday of 
the week. Once you select a workout and diet within one of the days that you also
have to select, it will save and you can view it for reference whenever you'd like.
You can also change them whenever you'd like.
![Profile Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/final_screenshots/profilePage.png)

## About
A simple about page for how we made this project and who made it.
![About Page](https://github.com/todddvorsky/cs326-final-lamed/blob/master/screenshots/final_screenshots/aboutPage.png)


## APIs:
### Diet Routes:

| End Point      | Type of request | Description              |
|--------------|-----------|--------------------------|
| diet/allDiets | GET| Get all of the diets in the database |
| diet/:diet | GET| Get a diet with the specified dietID |
| diet/:diet/recipes | GET| Get the recipes associated with diet specified with the dietID given|
| diet/create | POST| Create a diet to put in the DB |
| diet/recipe/create | POST| create a recipe to put in the DB|
| diet/update/:diet | PUT| Update a diet with the specified dietID |
| diet/recipes/update/:recipe | PUT| Update a recipe with the specified recipeID |
| diet/delete/:diet | DELETE| Delete a specified diet |
| diet/recipe/delete/:recipe | DELETE| Delete a specified recipe |

### Workout Routes:

| End Point      | Type of request | Description              |
|--------------|-----------|--------------------------|
| workout/allWorkouts | GET| Get all of the workouts in the database |
| workout/:workout | GET| Get a workout with the specified workoutID |
| workout/:workout/exercises | GET| Get the exercises associated with a specific workout|
| workout/create | POST| Create a workout to put in the DB |
| workout/exercise/create | POST| create an exercise to put in the DB|
| workout/update/:workout | PUT| Update a workout with the specified workoutID |
| workout/exercises/update/:exercise | PUT| Update an exercise with the specified exerciseID |
| workout/delete/:workout | DELETE| Delete a specified workout from the DB |
| workout/exercise/delete/:exercise | DELETE| Delete a specified exercise from the DB |


### User Routes:

| End Point      | Type of request | Description              |
|--------------|-----------|--------------------------|
| users/ | GET| Get all of the users in the database |
| users/:user | GET| Get a user with the specified userID |
| users/workouts/currentuser | GET| Get the workouts associated with the current user|
| users/diets/currentUser | GET| Get the diets associated with the current user |
| users/addfriend/:friendemail | POST| Add to this user's friends with the given friend's email |
| users/friends/myfriends | GET| Get this users accepted friends from the DB |
| users/friends/delete/:friendid | DELETE| Delete the current chosen friend from this users friends list |
| users/update/current | POST| update a the current users info|
| users/profile/myinfo | GET| Get the current users profile info |
| users/profile/info/update | POST| Update the current users profile info with the inputed info |
| users/profile/info/create | POST| Create an initial entry in the database for the current users profile info|
| users/profile/plan/create | POST| Create an initial entry in the database for the current users profile plan|
| users/profile/workout/update |POST| Update the workout plan for the current user on the selected day |
| users/profile/diet/update| POST| Update the diet plan for the current user on the selected day |
| users/profile/plan/:day | GET| Get the profile's plan for the specified day given |
| users/diets/:name | GET| Get dietId associated with the named diet given |
| users/workouts/:name | GET| Get the workoutID associated with the named workout given |
| users/user/workouts/:userid | GET| Get the workouts associated with this user |
| users/user/diets/:userid | GET| Get the diets associated with this user |

## Database Description:

### List of relations
  |    Name     | Type  |           
  |-------------|-------|
  | diets       | table | 
  | exercises   | table | 
  | friends     | table | 
  | passwords   | table | 
  | profile     | table | 
  | profileinfo | table | 
  | profileplan | table | 
  | recipes     | table | 
  | users       | table | 
  | workouts    | table | 

#### Users Table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| UserId | serial INT    | The ID of a user  |
| firstName | VARCHAR(255)   | first name of the user |
| lastName | VARCHAR(255)   | last name of the user |
| email | VARCHAR(255)   | email of the user that is unique in the table |


#### profileInfo Table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| userId | INT | the ID of the user who's profile it is |
| username | VARCHAR(255) | username created on the profile page for the user |
|    age | INT | age of the user |
|    goalweight | INT | goal weight for this user |
|    country | VARCHAR(255) | country of residence for this user |
|    about | VARCHAR(255) | short bio about this user |
|    favgym | VARCHAR(255) | name of this user's favorite gym |
|    favworkout | VARCHAR(255) | name of this user's favorite workout |
|    favrecipe | VARCHAR(255) | name of this user's favorite recipe |

#### profilePlan Table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| userId | INT | the ID of the user who's profile it is |
| day | VARCHAR(255) | Day of the week associated with the following diet & workout |
| dietId | INT | ID of the associated diet |
| workoutId | INT | ID of the associated workout |

#### friends Table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| userId | INT | ID for identifying the user |
| friendId | INT | ID for identifying another user  |
| status | VARCHAR(255) | The status of the friend request (pending or accepted) |

#### workouts Table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| workoutID | INT | ID for this specific workout |
| userId | INT | ID of a user to associate this workout with  |
| workoutName | VARCHAR(255) | A unique name for this specific workout |


#### exercises Table
##### This is a table for unique exercises across the app
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| exerciseId | INT | Unique serial ID for this specific exercise |
| workoutId | INT | ID of the workout to associate this exercise with |
| name | VARCHAR(255) | name of this specific exercise |
| description | TEXT | A description for this exercise |
| sets | INT | number of sets to do for this exercise |
| reps | INT | number of reps to do for this exercise |
| tag | VARCHAR(255) | a tag to associate with this exercise |

#### diets Table
##### This is a table for unique diets across the app
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| dietId | INT | ID for this specific diet |
| userId | INT | ID of a user to associate this diet with  |
| dietName | VARCHAR(255) | A unique name for this specific diet |

#### usersDiets Table
##### This is a table for all the diets saved by users
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| dietId | INT | ID for this specific diet |
| userId | INT | ID of a user to associate this diet with  |
| dietName | VARCHAR(255) | A name for this specific diet |

#### usersWorkouts Table
##### This is a table for all the workouts saves by users
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| workoutId | INT | ID for this specific workout |
| userId | INT | ID of a user to associate this workout with  |
| workoutName | VARCHAR(255) | name for this specific workout |

#### recipes Table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| recipeId | INT | Unique serial ID for this specific recipe |
| dietId | INT | ID of the diet to associate this recipe with |
| recipeName | TEXT | name of this specific recipe |
| description | TEXT | A description for this recipe |
| ingredients | TEXT | List of ingredients for this recipe |
| tag | TEXT | a tag to associate with this recipe (breakfast, lunch, or dinner) |

#### passwords Table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| userId | INT | ID of the user to associate with the password |
| salt | CHAR(32) | the salt to encrypt this users password with |
| recipeName | TEXT | name of this specific recipe |
| hashedpwd | CHAR(128) | The hashed password for this user |

## URL Routes/Mapping:
 - 



## Authentication/Authorization
To authenticate users we had our express app use passport with a local strategy. 
We do not have any special permissions, except that a user must first log in before they can access the home page.
Once a user is logged in, their session is used throughout the site in order to indentify who the current user is.

## Division of Labor:

#### Patrick Kelley
- all of the user endpoints and functionality
- design of the social page
- design of the profile page
- JS implementation of the social page
- JS implementation of the profile page
- Milestone and final markdown write-ups
- DB design/implementation
- Diet/workout pages bugs/testing
- Social/profile pages bugs/testing

#### Todd Dvorsky
- design of the navigation bar, home page, login page, workout page, diet page, and about page
- JS implementation of the workout page
- JS implementation of the diet page
- diet and workout endpoints/DB logic of the API
- created the express app
- designed the database
- deployed app on heroku
- Docs

#### Jason Bolton
- setup Express routers
- account registration/login functions and DB logic
- full implementation of authentication
- Passport serialization and strategy design
- diets and workouts endpoints/DB logic of the API
- JS implementation and styling of the browse pages
- JS implementation of login page

## Conclusion:
Overall, this project was a great learning tool, and very fun to do. It has definitely made
us realize that we should start projects early on instead of waiting to the last minute and
sacrificing a lot of sleep! It's also made us realize how much goes into making a fully
functional web application, from the HTML to the JS to the CSS to all of the routing and
API functionality. It makes us appreciate other websites a lot more now! Connecting all of the
pages and the info from the DB is very intricate, especially with a lot of features like our
application  has. It was a big learning curve but we prevailed. We also learned it's
okay to have changes along the design and implementation road, because you may find out an
easier or more efficient way to solve a problem or streamline fucntionality for the user.
Before starting the project, we would have liked to have a better idea of the project as a
whole and what was going to be expected of us for each milestone. We also think spending more
time going through heroku in class would have been beneficial to the project.
