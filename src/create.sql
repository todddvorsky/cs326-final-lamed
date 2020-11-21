DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS friends CASCADE;
DROP TABLE IF EXISTS workouts CASCADE;
DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS diets CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS profileinfo CASCADE;
DROP TABLE IF EXISTS profileplan CASCADE;
DROP TABLE IF EXISTS passwords CASCADE;


CREATE TABLE users(
    userId SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

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
    dietName VARCHAR(255)
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