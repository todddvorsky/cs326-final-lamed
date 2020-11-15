window.addEventListener("load", function() {
    loadUserWorkouts(document.getElementById("users-container"));
    loadRecs(document.getElementById("recs-container"));
});


async function loadUserWorkouts(element){
    element.innerHTML='';

    const diets = await (await fetch('/diets/allDiets')).json();

    for(let i=0; i<5; i++){
        const a = document.createElement('a');
        a.href = '#'; //TODO
        a.classList.add('list-group-item', 'list-group-item-action');
        a.innerText = diets[i].dietName;

        a.addEventListener("click", () => {itemClickEvent(a)});

        element.appendChild(a);
    }
}
async function loadRecs(element){
    const diets = await (await fetch('/diets/allDiets')).json();

    for(let i=5; i<10; i++){
        const a = document.createElement('a');
        a.href = '#'; //TODO
        a.classList.add('list-group-item', 'list-group-item-action');
        a.innerText = diets[i].dietName;

        a.addEventListener("click", () => {itemClickEvent(a)});

        element.appendChild(a);
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
        const diet = await (await fetch('/diets/id')).json();

        left.classList.add("col-5");

        const right = document.createElement("div");
        right.classList.add("col-7", "container");
        right.innerText = element.innerText + ":\nId: " + diet.dietId + "\nRecipes: " + JSON.stringify(diet.recipes);
        right.id = "readmore";
        document.getElementById("container-a").appendChild(right);
    }
}