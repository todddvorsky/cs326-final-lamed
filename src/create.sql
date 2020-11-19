DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friends;
DROP TABLE IF EXISTS workouts;
DROP TABLE IF EXISTS exercises;
DROP TABLE IF EXISTS diets;
DROP TABLE IF EXISTS recipes;


CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    password CHAR(60),
);

CREATE TABLE friends (
    friendsId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    friendId INT,
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (friendId) REFERENCES users(userId),
);

CREATE TABLE workouts (
    workoutId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    workoutName VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES users(userId),
);

CREATE TABLE exercises (
    exerciseId INT AUTO_INCREMENT PRIMARY KEY,
    workoutId INT,
    FOREIGN KEY (workoutId) REFERENCES workouts(workoutId),
    name VARCHAR(255),
    description TEXT,
    sets INT,
    reps INT,
    time TIME,
    tag VARCHAR(255)
);

CREATE TABLE diets (
    dietId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    dietName VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES users(userId),
);

CREATE TABLE recipes (
    recipeId INT AUTO_INCREMENT PRIMARY KEY,
    dietId INT,
    FOREIGN KEY (dietId) REFERENCES diets(dietId),
    description TEXT,
    ingredients TEXT,
    tag VARCHAR(255)
);