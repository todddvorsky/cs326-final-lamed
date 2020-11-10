window.addEventListener("load", function() {
    loadUserWorkouts(document.getElementById("users-container"));
    loadRecs(document.getElementById("recs-container"));
});


function loadUserWorkouts(element){
    element.innerHTML='';
    //TODO get a user's workouts from backend
    for(let i=0; i<5; i++){
        const a = document.createElement('a');
        a.href = '#'; //TODO
        a.classList.add('list-group-item', 'list-group-item-action');
        a.innerText = "Your workout!"; //TODO

        a.addEventListener("click", () => {itemClickEvent(a)});

        element.appendChild(a);
    }
}
function loadRecs(element){
    //TODO get a list of 5? elements from backend
    for(let i=0; i<5; i++){
        const a = document.createElement('a');
        a.href = '#'; //TODO
        a.classList.add('list-group-item', 'list-group-item-action');
        a.innerText = "Check this one out!"; //TODO

        a.addEventListener("click", () => {itemClickEvent(a)});

        element.appendChild(a);
    }
}

function itemClickEvent(element){
    const left = document.getElementById("container-b");
    //check if item is currently open in right-hand container
    //TODO add an & to this condition checking if its the one currently being displayed
    if(left.classList.contains("col-2")){
        console.log("hiding right panel");
        document.getElementById("readmore").remove();
        left.classList.remove("col-2");
    }
    else{
        console.log("creating right panel");
        left.classList.add("col-2");

        const right = document.createElement("div");
        right.classList.add("col-2", "container");
        right.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        right.id = "readmore";
        document.getElementById("container-a").appendChild(right);
    }
}