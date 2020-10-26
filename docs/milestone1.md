# Milestone 1

## Division Of Labor
### Todd Dvorsky  
- Login page,
Home page,
Diet page,
Workout page,
Browse workout page,
Browse diet page,
About page,
Wireframes

### Patrick Kelley
- Social page,
Profile page,
Data Interactions,
HTML Screenshots


## Important Components/Data Interaction
Users of this app will have their own credentials to login to their account in order to keep their data separate from other users. Within their profiles, they will have the option to focus on just workouts, just diets/recipes/nutrition, or combine the two. When wanting to combine the two, users can pick a workout that they're currently focusing on and get a diet plan matched up with it, or vice versa if they're more in tune with their diet and want some help on the workout side of things. Users can also browse around on both the workout and diet sides if they're wanting a better idea of the app. While they'll always have the option to randomize options that match their desired profile, users can also customize their own diet or workout if they want to be very precise.

There will be multiple users of the app, users will be able to choose their favorite recipes/workouts to put on their profile, along with other personal info they wish to share. Users data will be stored and only partially shown depending on the page that they are on. Users will login using their own known data. Users will also be able to interact with databases of recipes and workouts to pick the ones that they like. The social page will also incorporate recipes/workouts/statuses from other users that you can look at as well. The diet/recipes will also include calorie counts and all nutritional data needed to gauge if it's the correct diet for you.

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

## Wireframes
[Wireframes](https://drive.google.com/file/d/1CEFCk-R_HrVt_ahIVWXKrxtPOK4BYe0A/)

## Screenshots
### Login Page
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/login.png)

### Home Page
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/home.png)

### Diet Page
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/diets.png)

### Browse Diet Page
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/browse_diets.png)

### Workout Page
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/workouts.png)

### Browse Workouts Page
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/browse_workouts.png)

### Social Page
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/social.png)

### Profile Page #1
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/profile_1.png)

### Profile Page #2
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/profile_2.png)

### About Page #2
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/about.png)


