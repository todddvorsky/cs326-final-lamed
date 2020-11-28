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
        
        const q = await fetch('/users/'+wo['userid']);
        const creator = await q.json();

        left.classList.add("col-5");

        const right = document.createElement("div");
        right.classList.add("col-7", "container");
        right.innerText = element.innerText + ":\nID: " + wo['workoutid'] + "\nCreator: " + creator.firstname + " " + creator.lastname;
        right.id = "readmore";
        document.getElementById("container-a").appendChild(right);
    }
}