
window.addEventListener("load", async function(){
   
    //Hide the elements that update until the 'change' buttons are hit
    document.getElementById('changing-profile').style.display = "none";
    document.getElementById('changing-plan').style.display = "none";


    document.getElementById('change-profile-btn').addEventListener("click", function(){
        document.getElementById('current-profile').style.display = "none";
        document.getElementById('changing-profile').style.display = "block";
    });
    document.getElementById('save-profile-btn').addEventListener("click", function(){
        document.getElementById('current-profile').style.display = "block";
        document.getElementById('changing-profile').style.display = "none";
    });
    document.getElementById('change-plan-btn').addEventListener("click", function(){
        document.getElementById('current-plan').style.display = "none";
        document.getElementById('changing-plan').style.display = "block";
    });
    document.getElementById('save-plan-btn').addEventListener("click", function(){
        document.getElementById('current-plan').style.display = "block";
        document.getElementById('changing-plan').style.display = "none";
    });

    getDiets_workouts();
    updateCurrentUser();
    createNewUser();
});




/*async function that populates the day buttons with their
    respective diets and workouts for a specific user - GET*/
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
/*async function that creates a user when the input is put into the 
    profile section (if none was in there before) - POST*/
    async function createNewUser(){
        const myInit = {
            method: "POST"
        };
        const response = await fetch("/users/create", myInit);
        if (!response.ok) {
            console.log(response.error);
            return;
        }
        const db = await response.json();
        console.log(db.name);
    }
