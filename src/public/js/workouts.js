window.addEventListener("load", function() {
    loadUserWorkouts(document.getElementById("users-container"));
    loadRecs(document.getElementById("recs-container"));
});

const workoutMap = {};

async function loadUserWorkouts(element){
    element.innerHTML='';

    const workouts = await (await fetch('/workouts/allWorkouts')).json();
    let i=0;
    while(i<5 && i<workouts.length){
        const a = document.createElement('a');
        a.href = '#'; //TODO
        a.classList.add('list-group-item', 'list-group-item-action');
        a.innerText = workouts[i].workoutname;

        workoutMap[workouts[i]['workoutname']] = workouts[i]['workoutid'];

        a.addEventListener("click", () => {itemClickEvent(a)});

        element.appendChild(a);

        i++;
    }
}
async function loadRecs(element){
    const workouts = await (await fetch('/workouts/allWorkouts')).json();

    let i=0;
    while(i<5 && i<workouts.length){
        const a = document.createElement('a');
        a.href = '#'; //TODO
        a.classList.add('list-group-item', 'list-group-item-action');
        a.innerText = workouts[i]['workoutname'];

        workoutMap[workouts[i]['workoutname']] = workouts[i];

        a.addEventListener("click", () => {itemClickEvent(a)});

        element.appendChild(a);

        i++;
    }
}

async function itemClickEvent(element){
    if(document.getElementById("readmore")){
        document.getElementById("readmore").remove();
    }
    const left = document.getElementById("container-b");
    //check if item is currently open in right-hand container
    //TODO add an & to this condition checking if its the one currently being displayed
    if(left.classList.contains("col-5")){
        left.classList.remove("col-5");
    }
    else{
        const wo = workoutMap[element.innerText];
        
        const q1 = await fetch('/users/'+wo['userid']);
        const creator = await q1.json();

        const q2 = await fetch('/workouts/' + wo.workoutid + '/exercises');
        const exercises = await q2.json();

        left.classList.add("col-5");

        const right = document.createElement("div");
        right.classList.add("col-7", "container");
        
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
        document.getElementById("container-a").appendChild(right);
    }
}