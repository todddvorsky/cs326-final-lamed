# Milestone 3

## Division of Labor

### Todd Dvorsky

### Patrick Kelley

- Social page,
Profile page,
Users route,
Users endpoints,
Users DB function/handling
MD milestone description

### Jason Bolton


## Database Description

Users Table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| UserId | serial INT    | The ID of a user  |
| firstName | VARCHAR(255)   | first name of the user |
| lastName | VARCHAR(255)   | last name of the user |
| email | VARCHAR(255)   | email of the user that is unique in the table |


profileInfo Table
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

profilePlan Table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| userId | INT | the ID of the user who's profile it is |
| day | VARCHAR(255) | Day of the week associated with the following diet & workout |
| dietId | INT | ID of the associated diet |
| workoutId | INT | ID of the associated workout |

friends Table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| userId | INT | ID for identifying the user |
| friendId | INT | ID for identifying another user  |
| status | VARCHAR(255) | The status of the friend request (pending or accepted) |

workouts Table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| workoutID | INT | ID for this specific workout |
| userId | INT | ID of a user to associate this workout with  |
| workoutName | VARCHAR(255) | A unique name for this specific workout |


exercises Table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| exerciseId | INT | Unique serial ID for this specific exercise |
| workoutId | INT | ID of the workout to associate this exercise with |
| name | VARCHAR(255) | name of this specific exercise |
| description | TEXT | A description for this exercise |
| sets | INT | number of sets to do for this exercise |
| reps | INT | number of reps to do for this exercise |
| tag | VARCHAR(255) | a tag to associate with this exercise |

diets Table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| dietId | INT | ID for this specific diet |
| userId | INT | ID of a user to associate this diet with  |
| dietName | VARCHAR(255) | A unique name for this specific diet |

recipes Table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| recipeId | INT | Unique serial ID for this specific recipe |
| dietId | INT | ID of the diet to associate this recipe with |
| recipeName | TEXT | name of this specific recipe |
| description | TEXT | A description for this recipe |
| ingredients | TEXT | List of ingredients for this recipe |
| tag | TEXT | a tag to associate with this recipe (breakfast, lunch, or dinner) |

passwords Table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| userId | INT | ID of the user to associate with the password |
| salt | CHAR(32) | the salt to encrypt this users password with |
| recipeName | TEXT | name of this specific recipe |
| hashedpwd | CHAR(128) | The hashed password for this user |
