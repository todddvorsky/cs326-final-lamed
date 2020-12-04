window.addEventListener("load", async function() {
    await loadUserWorkouts(document.getElementById("users-container"));
    loadRecs(document.getElementById("recs-container"));
});

const workoutMap = {};
let curSelection = null;
let curUserId = null;

async function loadUserWorkouts(element){
    element.innerHTML='';

    //get the current user's workouts
    const workouts = await (await fetch('/workouts/userWorkouts')).json();

    if(!workouts || workouts.length === 0){
        element.innerHTML = "<i>You have not posted any workouts</i>";
        return;
    }

    curUserId = workouts[0]['userid'];

    for(let i=0; i<5 && i<workouts.length; i++){
        const a = document.createElement('a');
        a.href = '#'; //TODO
        a.classList.add('list-group-item', 'list-group-item-action');
        a.innerText = workouts[i].workoutname;

        workoutMap[workouts[i]['workoutname']] = workouts[i];

        a.addEventListener("click", () => {itemClickEvent(a, "user")});

        element.appendChild(a);
    }
}
async function loadRecs(element){
    const workouts = await (await fetch('/workouts/allWorkouts')).json();

    let count = 5;
    for(let i=0; i<count && i<workouts.length; i++){
        if(workouts[i]['userid'] !== curUserId){
            const a = document.createElement('a');
            a.href = '#'; //TODO
            a.classList.add('list-group-item', 'list-group-item-action');
            a.innerText = workouts[i]['workoutname'];

            workoutMap[workouts[i]['workoutname']] = workouts[i];

            a.addEventListener("click", () => {itemClickEvent(a, "rec")});

            element.appendChild(a);
        }
        else{
            count++;
        }
    }
}

async function itemClickEvent(element, type){
    const left = document.getElementById("container-b");
    let right = document.getElementById("readmore");

    if( curSelection && curSelection === element) {
        left.classList.remove("col-5");
        curSelection = null;

        if(right){
            right.remove();
        }
    }
    else{
        curSelection = element;

        const wo = workoutMap[element.innerText];

        console.log("wo: " + JSON.stringify(wo));
        
        const q1 = await fetch('/users/'+wo['userid']);
        const creator = await q1.json();

        const q2 = await fetch('/workouts/' + wo.workoutid + '/exercises');
        const exercises = await q2.json();

        left.classList.add("col-5");

        if(!right){
            right = document.createElement("div");
            right.classList.add("col-7", "container");
        }
        
        let html = "";
        html += "<h2><u>" + element.innerText + "</u></h2>";
        html += "<p><i>By " + creator.firstname + " " + creator.lastname + "</i></p>";
        html += "<h4>Exercises:<h4>";
        for(let i=0; i< exercises.length; i++){
            html += "<hr class=\"dotted\">";
            const e =  exercises[i];
            html += "<p><b>" + e.name + "</b></p>";
            html += "<p>" + e.description + "</p>";
            html += "<p><u>Sets:</u> " + e.sets + ", <u>Reps:</u> " + e.reps + "</p>";
            html += "<p><u>Tag:</u><br/>" + e.tag + "</p>";
        }

        right.innerHTML = html;
        right.id = "readmore";

        const btn = document.createElement("button");
        if(type === "rec"){
            btn.type = "button";
            btn.classList.add("btn", "btn-success");
            btn.innerText = "Add This Workout";
            btn.addEventListener("click", async () => {
                let newWorkout = await fetch('workouts/create', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        'workoutName' : wo.workoutname
                    }),
                });
                if(newWorkout.ok){
                    alert("Workout added!");
                }
                else{
                    alert("failed to add workout, sorry!");
                }
                newWorkout = await newWorkout.json();
            });
        }
        else{
            btn.classList.add("btn", "btn-danger", "browse-btn");
            btn.innerText = "Delete Workout"
            btn.addEventListener("click", async () => {
                console.log(wo.workoutid);
                let res = await fetch(`workouts/delete/${wo.workoutid}`,{
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'DELETE'
                });
                if(res.ok)
                    alert("Workout deleted!");
                else
                    alert("failed to delete workout, sorry!");
            });
        }

        right.appendChild(btn);

        document.getElementById("container-a").appendChild(right);
    }
}