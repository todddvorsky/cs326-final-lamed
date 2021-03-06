let curr_friend_id;

window.addEventListener("load", async function(){
    /*populate the friends list with the other users of the app
    contains event listeners to switch the shown workouts/diets*/
    populateFriends();
    document.getElementById('add-friend-btn').addEventListener('click', function() {
        const email = document.getElementById('add-friend-email').value;
        addFriend(email);
    });
    document.getElementById('delete-friend-btn').addEventListener('click', deleteUser);
    document.getElementById('friendalert').style.display = "none";
    const updateBody = {firstname: 'Bob', lastname: 'Hansen', email: 'bob@bob.com'};
});

/*Populate the friends list with the current users friends.
    Click on a user in the menu to see their workout/diet of the day!*/
async function populateFriends(){
    const response = await fetch("/users/friends/myfriends");
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    for(let user of db){
        const newName = document.createElement("a");
        const resp = await fetch(`/users/${user.friendid}`);
        if (!resp.ok) {
            console.log(resp.error);
            return;
        }
        const friendz = await resp.json();
        const friend = friendz;
        const f_Upcase = friend.firstname.charAt(0).toUpperCase();
        const l_Upcase = friend.lastname.charAt(0).toUpperCase();
        newName.innerHTML = f_Upcase+friend.firstname.slice(1)+' '+l_Upcase+friend.lastname.slice(1);
        const id = friend.userid;
        newName.classList.add('dropdown-item');
        newName.addEventListener('click', async function() {
            document.getElementById("friends-name").innerHTML = newName.innerHTML;
            await populateDiet(id);
            await populateWorkout(id);
            curr_friend_id = id;
        });
        document.getElementById("dropdownDiv").appendChild(newName);
    }
}

/*Use the specified user id to populate the workout
    section of the social page for that friend
*/
async function populateWorkout(userid){
    const response = await fetch(`/users/user/workouts/${userid}`);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    if(!db[0]){
        document.getElementById('workout').innerHTML = 'This friend has not yet picked a workout!';
    }
    else{
        const user_id = db[0].userid;
        const ex = await fetch(`/workouts/${db[0].workoutid}/exercises`);
        const exercises = await ex.json();
        if(true){
            const user_wo = db[0];
            document.getElementById('workout').innerHTML = user_wo.workoutname;
            document.getElementById('workout_desc').innerHTML = exercises[0].description;
        }
    }
}

/*Function to get the recipes of a specified diet, so we
can populate the social page with a specified friends diet components
*/
async function getDietRecipes(dietid){
    const response = await fetch(`/diets/${dietid}/recipes`);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    return (db);
}

/*Use the specified user id to populate the diet
section of the social page for that friend selected*/
async function populateDiet(userid){
    const response = await fetch(`/users/user/diets/${userid}`);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    if(!db[0]){
        document.getElementById('dietName').innerHTML = 'This Friend has not yet picked any diets!';
    }
    else{
        const user_id = db[0].userid;
        const recipes = await getDietRecipes(db[0].dietid);
        if(true){
            const user_diet = db[0];
            document.getElementById('dietName').innerHTML = user_diet.dietname;
            for(let rec of recipes){
                if(rec.tag === 'breakfast'){
                    document.getElementById('breakfast').innerHTML = rec.recipename;
                    document.getElementById('breakfast_desc').innerHTML = rec.description;
                }
                if(rec.tag === 'lunch'){
                    document.getElementById('lunch').innerHTML = rec.recipename;
                    document.getElementById('lunch_desc').innerHTML = rec.description;
                }
                if(rec.tag === 'dinner'){
                    document.getElementById('dinner').innerHTML = rec.recipename;
                    document.getElementById('dinner_desc').innerHTML = rec.description;
                }
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
    if(!friendsEmail){
        document.getElementById('friendalert').innerHTML = 'No email was given';
        document.getElementById('friendalert').style.display = "block";
    }
    else{
        const response = await fetch(`/users/addfriend/${friendsEmail}`, myInit);
        if (!response.ok) {
            console.log(response.error);
            return;
        }
        const db = await response.json();
        document.getElementById('friendalert').innerHTML = db.msg;
        document.getElementById('friendalert').style.display = "block";
    }
}

/*delete the friend whose profile you're looking at*/
async function deleteUser(){
    const myInit = {
        method: 'DELETE'
    };
    const response = await fetch(`/users/friends/delete/${curr_friend_id}`, myInit);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    document.getElementById('friendalert').innerHTML = db.msg;
    document.getElementById('friendalert').style.display = "block";
}

/*UPDATE a users firstname lastname email - Body must contain these!*/
async function updateUser(msgbody){
    const myInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(msgbody)
    };
    const response = await fetch(`/users/update/current`, myInit);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
}