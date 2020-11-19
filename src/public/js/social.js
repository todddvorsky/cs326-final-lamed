
//global id's to track
let curr_user_id;
let curr_friend_id;

window.addEventListener("load", async function(){
    /*populate the friends list with the other users of the app
    contains event listeners to switch the shown workouts/diets*/
    populateFriends();
    document.getElementById('add-friend-btn').addEventListener('click', function() {
        addFriend(98);
    });
    document.getElementById('delete-friend-btn').addEventListener('click', deleteUser);
});

/*Populate the friends list with users that use this app.
    Click on a user in the menu to see their workout/diet of the day!*/
async function populateFriends(){
    const response = await fetch("http://127.0.0.1:8080/users/");
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    const names = db.users;
    console.log(db.users);
    for(let i = 0; i<names.length; i++){
        const newName = document.createElement("a");
        newName.innerHTML = names[i].name;
        const id = names[i].userid;
        newName.classList.add('dropdown-item');
        newName.addEventListener('click', function() {
            document.getElementById("friends-name").innerHTML = newName.innerHTML;
            populateDiet_Workout(id);
            curr_friend_id = id
        });
        document.getElementById("dropdownDiv").appendChild(newName);
    }
}

/*Use the specified user id to populate the diet and workout
    sections of the social page for that user*/
async function populateDiet_Workout(id){
    const response = await fetch(`http://127.0.0.1:8080/users/${id}`);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    const user_id = db.userid;
    console.log(user_id);
    if(user_id === id.toString()){
        console.log(1);
        const user_diet = db.diet;
        const user_wo = db.workout;
        document.getElementById('breakfast').innerHTML = user_diet.breakfast;
        document.getElementById('lunch').innerHTML = user_diet.lunch;
        document.getElementById('dinner').innerHTML = user_diet.dinner;
        document.getElementById('workout').innerHTML = user_wo;
    }
}

/*given the name of the current user, add the user given in the input
    next to the 'add friend' button*/
async function addFriend(id){
    const myInit = {
        method: 'POST',
        body: JSON.stringify({
            userid: id,
            name: document.getElementById('add-friend-name').value
        })
    };
    console.log(myInit.body);
    const response = await fetch(`/users/update/${id}`, myInit);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    console.log(db);
    const newName = document.createElement("a");
    newName.innerHTML = db.name;
    const Uid = db.userid;
    newName.classList.add('dropdown-item');
    newName.addEventListener('click', function() {
        document.getElementById("friends-name").innerHTML = newName.innerHTML;
        populateDiet_Workout(Uid);
        curr_friend_id = Uid;
    });
    document.getElementById("dropdownDiv").appendChild(newName);
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
