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

## Important Components
Users of this app will have their own credentials to login to their account in order to keep their data separate from other users. Within their profiles, they will have the option to focus on just workouts, just diets/recipes/nutrition, or combine the two. When wanting to combine the two, users can pick a workout that they're currently focusing on and get a diet plan matched up with it, or vice versa if they're more in tune with their diet and want some help on the workout side of things. Users can also browse around on both the workout and diet sides if they're wanting a better idea of the app. While they'll always have the option to randomize options that match their desired profile, users can also customize their own diet or workout if they want to be very precise.

There will be multiple users of the app, users will be able to "like" sets of workouts/diets, workouts alone, or diets alone. Users can also comment on any set as well to give other users more insight. The diet/recipes will also include calorie counts and all nutritional data needed to gauge if it's the correct diet for you.

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
