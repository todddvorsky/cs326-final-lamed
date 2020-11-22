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


CREATE TABLE profileinfo(
    userId INT,
    username VARCHAR(255),
    age INT,
    goalweight INT,
    country VARCHAR(255),
    about VARCHAR(255),
    favgym VARCHAR(255),
    favworkout VARCHAR(255),
    favrecipe VARCHAR(255)
);

CREATE TABLE profileplan(
    userId INT,
    day VARCHAR(255),
    dietId INT,
    workoutId INT
);

CREATE TABLE friends (
    userId INT,
    friendId INT,
    status VARCHAR(255)
    -- FOREIGN KEY (userId) REFERENCES users(userId),
    -- FOREIGN KEY (friendId) REFERENCES users(userId)
);

CREATE TABLE workouts (
    workoutId SERIAL PRIMARY KEY,
    userId INT,
    workoutName VARCHAR(255) UNIQUE
    -- FOREIGN KEY (userId) REFERENCES users(userId)
);

CREATE TABLE exercises (
    exerciseId SERIAL PRIMARY KEY,
    workoutId INT,
    -- FOREIGN KEY (workoutId) REFERENCES workouts(workoutId),
    name VARCHAR(255),
    description TEXT,
    sets INT,
    reps INT,
    tag VARCHAR(255)
);

CREATE TABLE diets (
    dietId SERIAL PRIMARY KEY,
    userId INT,
    dietName VARCHAR(255) UNIQUE
    -- FOREIGN KEY (userId) REFERENCES users(userId)
);

CREATE TABLE recipes (
    recipeId SERIAL PRIMARY KEY,
    dietId INT,
    -- FOREIGN KEY (dietId) REFERENCES diets(dietId),
    recipeName TEXT,
    description TEXT,
    ingredients TEXT,
    tag VARCHAR(255)
);

CREATE TABLE passwords (
    userId INT,
    -- FOREIGN KEY (userId) REFERENCES users(userId),
    salt CHAR(32),
    hashedpwd CHAR(128) 
);