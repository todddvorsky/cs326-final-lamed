//global id's to track
let curr_user_id;
let curr_friend_id;

window.addEventListener("load", async function(){
    /*populate the friends list with the other users of the app
    contains event listeners to switch the shown workouts/diets*/
    populateFriends();
    document.getElementById('add-friend-btn').addEventListener('click', function() {
        addFriend('ptkelley@umass.edu');
    });
    document.getElementById('delete-friend-btn').addEventListener('click', deleteUser);
});

/*Populate the friends list with users that use this app.
    Click on a user in the menu to see their workout/diet of the day!*/
async function populateFriends(){
    const response = await fetch("/users/");
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    //const names = db.users;
    console.log(db);
    for(let user of db){
        const newName = document.createElement("a");
        const f_Upcase = user.firstname.charAt(0).toUpperCase();
        const l_Upcase = user.lastname.charAt(0).toUpperCase();
        newName.innerHTML = f_Upcase+user.firstname.slice(1)+' '+l_Upcase+user.lastname.slice(1);
        const id = user.userid;
        newName.classList.add('dropdown-item');
        newName.addEventListener('click', function() {
            document.getElementById("friends-name").innerHTML = newName.innerHTML;
            populateDiet(id);
            populateWorkout(id);
            curr_friend_id = id;
        });
        document.getElementById("dropdownDiv").appendChild(newName);
    }
}

/*Use the specified user id to populate the workout
    section of the social page for that friend
*/
async function populateWorkout(id){
    const response = await fetch(`/users/workouts/${id}`);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    const user_id = db[0].userid;
    console.log(user_id);
    if(user_id === curr_friend_id){
        console.log('in if state');
        const user_wo = db[0];
        document.getElementById('workout').innerHTML = user_wo.workoutname;
    }
}

/*Function to get the recipes of a specified diet, so we
can populate the social page with a specified friends diet components
*/
async function getDietRecipes(dietid){
    const response = await fetch(`/users/diets/recipes/${dietid}`);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    return (db);
}

/*Use the specified user id to populate the diet
section of the social page for that friend selected*/
async function populateDiet(id){
    const response = await fetch(`/users/diets/${id}`);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    const user_id = db[0].userid;
    const recipes = await getDietRecipes(db[0].dietid);
    console.log(user_id);
    if(user_id === curr_friend_id){
        console.log('in if state');
        const user_diet = db[0];
        document.getElementById('dietName').innerHTML = user_diet.dietname;
        console.log(recipes);
        for(let rec of recipes){
            if(rec.tag === 'breakfast'){
                document.getElementById('breakfast').innerHTML = rec.recipename;
            }
            if(rec.tag === 'lunch'){
                document.getElementById('lunch').innerHTML = rec.recipename;
            }
            if(rec.tag === 'dinner'){
                document.getElementById('dinner').innerHTML = rec.recipename;
            }
        }
    }
}

    
/*given the name of the current user, add the user given in the input
    next to the 'add friend' button*/
async function addFriend(friendsEmail){
    const myInit = {
        method: 'POST',
    };
    const response = await fetch(`/users/addfriend/${friendsEmail}`, myInit);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    console.log(db);
    //once added, have to add functionality to friends lists
    //Also have to change the DOM to reflect the alerts the button gives back
    /*const newName = document.createElement("a");
    newName.innerHTML = db.name;
    const Uid = db.userid;
    newName.classList.add('dropdown-item');
    newName.addEventListener('click', function() {
        document.getElementById("friends-name").innerHTML = newName.innerHTML;
        populateDiet_Workout(Uid);
        curr_friend_id = Uid;
    });
    document.getElementById("dropdownDiv").appendChild(newName);*/
}

/*delete the friend whose profile you're looking at*/
async function deleteUser(){
    const myInit = {
        method: 'DELETE'
    };
    const response = await fetch(`/users/delete/${curr_friend_id}`, myInit);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    console.log(db.userid);
}
