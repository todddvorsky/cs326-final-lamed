window.addEventListener("load", function() {
    loadUserWorkouts(document.getElementById("users-container"));
    loadRecs(document.getElementById("recs-container"));
});

const dietMap = {};

async function loadUserWorkouts(element){
    element.innerHTML='';

    const diets = await (await fetch('/diets/allDiets')).json();

    let i=0;
    while(i<5 && i<diets.length){
        const a = document.createElement('a');
        a.href = '#'; //TODO
        a.classList.add('list-group-item', 'list-group-item-action');
        a.innerText = diets[i]['dietname'];

        dietMap[diets[i]['dietname']] = diets[i];

        a.addEventListener("click", () => {itemClickEvent(a)});

        element.appendChild(a);

        i++;
    }
}
async function loadRecs(element){
    const diets = await (await fetch('/diets/allDiets')).json();

    let i=0;
    while(i<5 && i<diets.length){
        const a = document.createElement('a');
        a.href = '#'; //TODO
        a.classList.add('list-group-item', 'list-group-item-action');
        a.innerText = diets[i]['dietname'];

        dietMap[diets[i]['dietname']] = diets[i];

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
        const di = dietMap[element.innerText];
        
        const q1 = await fetch('/users/'+di['userid']);
        const creator = await q1.json();

        const q2 = await fetch('/diets/' + di.dietid + '/recipes');
        const recipes = await q2.json();

        left.classList.add("col-5");

        const right = document.createElement("div");
        right.classList.add("col-7", "container");
        
        let html = "";
        html += "<h2><u>" + element.innerText + "</u></h2>";
        html += "<p><i>By " + creator.firstname + " " + creator.lastname + "</i></p>";
        html += "<h4>Recipes:<h4>";
        for(let i=0; i<recipes.length; i++){
            html += "<hr class=\"dotted\">";
            const r = recipes[i];
            html += "<p><b>" + r.recipename + "</b></p>";
            html += "<p>" + r.description + "</p>";
            html += "<p><u>Ingredients:</u><br/>" + r.ingredients + "</p>";
            html += "<p><u>Tag:</u><br/>" + r.tag + "</p>";
        }


        right.innerHTML = html;
        //right.innerText = element.innerText + ":\nID: " + di['dietid'] + "\nCreator: " + creator.firstname + " " + creator.lastname;
        right.id = "readmore";
        document.getElementById("container-a").appendChild(right);
    }
}