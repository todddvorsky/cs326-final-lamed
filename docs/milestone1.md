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
This is the page people will begin at to log into their accounts or create a new one. We will be keeping everyone's data that they put in here.

### Home Page
![Home Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/home.png)
This is a rough home page that has relative links to the other pages of the website. It will mostly just be a welcome page otherwise.

### Diet Page
![Diet Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/diets.png)
This page allows you to input any diet you customize yourself. You can click the browse diets button to look for new diets that you can choose for yourself. These chosen diets will show up in the diet dropdown or on your profile page.

### Browse Diet Page
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/browse_diets.png)
This is the browse diet page to pick a pre-made diet you like, or to draw inspiration to create your own diet!

### Workout Page
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/workouts.png)
This is a similar page to the diet page except for workouts. You can customize your own workouts that you will be able to set for yourself for the week/days ahead. Press the browse workout button to look for pre-made workouts.

### Browse Workouts Page
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/browse_workouts.png)
This is the page to look for pre-made workout that you can choose to display for yourself or keep for a future time.

### Social Page
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/social.png)
This page will give you a brief overview of your profile at the top, allowing you to make a status that for other users at the top, or you can choose to navigate away from the page to change your profile. The bottom of the page will contain statuses from other users and allow you to look at those users profiles to see what their talking about!

### Profile Page #1
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/profile_1.png)
This is the top half of the profile page. You will have some general information and favorites show up here, as well as some personal information like your age, weight goals, and location if you wish. You can have a profile picture as well.

### Profile Page #2
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/profile_2.png)
This is the bottom half of your profile page. Here your current workout and diet will be shown with pictures and recipes, as well as a workout description. You can choose what day of the week it shows so you can see what you've done/eaten, will do/eat, and what you should do/eat that day. The button at the bottom will allow you to change this information.

### About Page
![Login Page](https://github.com/todddvorsky/cs326-final-lamed/blob/patrick-dev/public/screenshots/about.png)
This is an about page to describe to users how the website came to be, who created it, and our goals/plans for the website!


