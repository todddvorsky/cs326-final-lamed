const currentUserId = 1;

window.addEventListener("load", async function(){
    //initilization
    const data = helpPackInfo();
    populateInitialProfileInfo(data);
    initiateButtonEvents();
    populateDietList();
    populateWorkoutList();

    //Hide the elements that update until the 'change' buttons are hit
    document.getElementById('changing-profile').style.display = "none";
    document.getElementById('change-profile-btn').addEventListener("click", function(){
        populateChangingInfo();
        document.getElementById('current-profile').style.display = "none";
        document.getElementById('changing-profile').style.display = "block";
    });
    document.getElementById('save-profile-btn').addEventListener("click", function(){
        populateProfileInfo();
        const packedInfo = helpPackInfo();
        console.log(packedInfo);
        updateProfileInfo(packedInfo);
        document.getElementById('current-profile').style.display = "block";
        document.getElementById('changing-profile').style.display = "none";
    });
    
});

//Button events for the profile plan
async function initiateButtonEvents(){
    document.getElementById('sunBtn').addEventListener("click", async function() {
        document.getElementById('day_txt').innerHTML = document.getElementById('sunBtn').innerHTML;
    });
    document.getElementById('monBtn').addEventListener("click", async function() {
        document.getElementById('day_txt').innerHTML = document.getElementById('monBtn').innerHTML;
    });
    document.getElementById('tuesBtn').addEventListener("click", async function() {
        document.getElementById('day_txt').innerHTML = document.getElementById('tuesBtn').innerHTML;
    });
    document.getElementById('wedBtn').addEventListener("click", async function() {
        document.getElementById('day_txt').innerHTML = document.getElementById('wedBtn').innerHTML;
    });
    document.getElementById('thursBtn').addEventListener("click", async function() {
        document.getElementById('day_txt').innerHTML = document.getElementById('thursBtn').innerHTML;
    });
    document.getElementById('friBtn').addEventListener("click", async function() {
        document.getElementById('day_txt').innerHTML = document.getElementById('friBtn').innerHTML;
    });
    document.getElementById('satBtn').addEventListener("click", async function() {
        document.getElementById('day_txt').innerHTML = document.getElementById('satBtn').innerHTML;
    });

}

//populate the changeable inputs with the values of the profile page
function populateChangingInfo(){
    document.getElementById('change_username').value = document.getElementById('pro_username').innerHTML;
    document.getElementById('change_age').value = document.getElementById('pro_age').innerHTML;
    document.getElementById('change_country').value = document.getElementById('pro_country').innerHTML;
    document.getElementById('change_goalweight').value = document.getElementById('pro_goalweight').innerHTML;
    document.getElementById('change_about').value = document.getElementById('about_me').innerHTML;
    document.getElementById('change_favgym').value = document.getElementById('pro_favgym').innerHTML;
    document.getElementById('change_favworkout').value = document.getElementById('pro_favworkout').innerHTML;
    document.getElementById('change_favrecipe').value = document.getElementById('pro_favrecipe').innerHTML;
}

//Populate the profile text with the changes made
function populateProfileInfo(){
    document.getElementById('pro_username').innerHTML = document.getElementById('change_username').value;
    document.getElementById('pro_age').innerHTML = document.getElementById('change_age').value;
    document.getElementById('pro_country').innerHTML = document.getElementById('change_country').value;
    document.getElementById('pro_goalweight').innerHTML = document.getElementById('change_goalweight').value;
    document.getElementById('about_me').innerHTML = document.getElementById('change_about').value;
    document.getElementById('pro_favgym').innerHTML = document.getElementById('change_favgym').value;
    document.getElementById('pro_favworkout').innerHTML = document.getElementById('change_favworkout').value;
    document.getElementById('pro_favrecipe').innerHTML = document.getElementById('change_favrecipe').value;
}

//Pack the info from the profile into an object
function helpPackInfo(){
    const proInfo = {};
    proInfo['username'] = document.getElementById('pro_username').innerHTML;
    proInfo['age'] = document.getElementById('pro_age').innerHTML;
    proInfo['country'] = document.getElementById('pro_country').innerHTML;
    proInfo['goalweight'] = document.getElementById('pro_goalweight').innerHTML;
    proInfo['about'] = document.getElementById('about_me').innerHTML;
    proInfo['favgym'] = document.getElementById('pro_favgym').innerHTML;
    proInfo['favworkout'] = document.getElementById('pro_favworkout').innerHTML;
    proInfo['favrecipe'] = document.getElementById('pro_favrecipe').innerHTML;
    return proInfo;
    
}

//Helper function to populate profile info
function helpPopulateInitialInfo(information){
    const info = information[0];
    if(!info){}
    else{
        if(info.hasOwnProperty('username')){
            document.getElementById('pro_username').innerHTML = info.username;
        }
        if(info.hasOwnProperty('age')){
            document.getElementById('pro_age').innerHTML = info.age;
        }
        if(info.hasOwnProperty('country')){
            document.getElementById('pro_country').innerHTML = info.country;
        }
        if(info.hasOwnProperty('goalweight')){
            document.getElementById('pro_goalweight').innerHTML = info.goalweight;
        }
        if(info.hasOwnProperty('about')){
            document.getElementById('about_me').innerHTML = info.about;
        }
        if(info.hasOwnProperty('favgym')){
            document.getElementById('pro_favgym').innerHTML = info.favgym;
        }
        if(info.hasOwnProperty('favworkout')){
            document.getElementById('pro_favworkout').innerHTML = info.favworkout;
        }
        if(info.hasOwnProperty('favrecipe')){
            document.getElementById('pro_favrecipe').innerHTML = info.favrecipe;
        }
    }
}

/*gets the profile info for the current user to populate the html page*/
async function populateInitialProfileInfo(info){
    const response = await fetch("/users/profile/myinfo");
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    console.log(db);
    if(db.length === 0){
        createInitialInfo(info);
    }
    else{
        helpPopulateInitialInfo(db);
    }
}

//CREATE initial info for profile in DB
async function createInitialInfo(info){
    const myInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(info)
    };
    const resp = await fetch("/users/profile/info/create", myInit);
    if (!resp.ok) {
        console.log(resp.error);
        return;
    }
    const creation = await resp.json();
}
/*UPDATE profile info*/
async function updateProfileInfo(msgbody){
    const myInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(msgbody)
    };
    const response = await fetch('/users/profile/info/update', myInit);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
}

/*function to populate the diet list of the current users plan*/
async function populateDietList(){
    const response = await fetch(`/users/diets/${currentUserId}`);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const diets = await response.json();
    console.log(diets);
    for(let diet of diets){
        const newName = document.createElement("a");
        newName.classList.add('dropdown-item');
        newName.innerHTML = diet.dietname;
        const dietId = diet.dietid;
        const resp = await fetch(`/users/diets/recipes/${dietId}`);
        if (!resp.ok) {
            console.log(resp.error);
            return;
        }
        const recipes = await resp.json();
        console.log(recipes);
        newName.addEventListener('click', function() {
            for(let rec of recipes){
                if(rec.tag === 'breakfast'){
                    document.getElementById('breakfast_txt').innerHTML = rec.recipename;
                }if(rec.tag === 'lunch'){
                    document.getElementById('lunch_txt').innerHTML = rec.recipename;
                }if(rec.tag === 'dinner'){
                    document.getElementById('dinner_txt').innerHTML = rec.recipename;
                }
            }
            document.getElementById('diet_dropdownMenuButton').innerHTML = newName.innerHTML;
        });
        document.getElementById("diet_dropdownDiv").appendChild(newName);
    }
}

/*function to populate the workout list of the current users plan*/
async function populateWorkoutList(){
    const response = await fetch(`/users/workouts/${currentUserId}`);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const workouts = await response.json();

    for(let wo of workouts){
        const newName = document.createElement("a");
        newName.classList.add('dropdown-item');
        newName.innerHTML = wo.workoutname;
        const woid = wo.workoutid;
        const resp = await fetch(`/users/workouts/exercises/${woid}`);
        if (!resp.ok) {
            console.log(resp.error);
            return;
        }
        const exercises = await resp.json();
        newName.addEventListener('click', function() {
            document.getElementById("workout_txt").innerHTML = exercises[0].name;
            document.getElementById('WO_dropdownMenuButton').innerHTML = newName.innerHTML;
        });
        document.getElementById("WO_dropdownDiv").appendChild(newName);
    }
}

/*
async function populateInitialDietWorkout(){
    const response = await fetch("/users/profile/myPlan");
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    console.log(db);
    if(db.length === 0){
        createInitialInfo(info);
    }
    else{
        helpPopulateInitialInfo(db);
    }
}

async function createInitialPlan(){
    const myInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            'userId': currentUserId,
            'mondaydietId': 999,
            'mondayworkoutId': 999,
            'tuesdaydietId': 999,
            'tuesdayworkoutId': 999,
            'wednesdaydietId': 999,
            'wednesdayworkoutId': 999,
            'thursdaydietId': 999,
            'thursdayworkoutId': 999,
            'fridaydietId': 999,
            'fridayworkoutId': 999,
            'saturdaydietId': 999,
            'saturdayworkoutId': 999,
            'sundaydietId': 999,
            'sundayworkoutId': 999
        })
    };
    const resp = await fetch("/users/profile/info/create", myInit);
    if (!resp.ok) {
        console.log(resp.error);
        return;
    }
    const creation = await resp.json();
}*/
/*create the diet & workout in the DB*/
async function createDaysDietsWorkouts(){
    const response = await fetch("/users/51");
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    console.log(db.workout);
}
/*async function that populates the day buttons with their
    respective diets and workouts for a specific user - GET
*/
async function getDiets_workouts(){
    const response = await fetch("/users/51");
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    console.log(db.workout);
}
/*async function that updates that day of the week's diet/workouts
    based on what is put into the forms for current user - POST */
async function updateCurrentUser(){
    const myInit = {
        method: "POST"
    };
    const response = await fetch("/users/update/65", myInit);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    console.log(db.name);
}

