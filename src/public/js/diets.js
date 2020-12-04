window.addEventListener("load", function() {
    loadUserWorkouts(document.getElementById("users-container"));
    loadRecs(document.getElementById("recs-container"));
});

const dietMap = {};
let curSelection = null;

async function loadUserWorkouts(element){
    element.innerHTML='';

    //get the users posted diets
    const diets = await (await fetch('/diets/userDiets')).json();

    if(!diets || diets.length === 0){
        element.innerHTML = "<i>You have not posted any diets</i>";
        return;
    }

    let i=0;
    while(i<5 && i<diets.length){
        const a = document.createElement('a');
        a.href = '#'; //TODO
        a.classList.add('list-group-item', 'list-group-item-action');
        a.innerText = diets[i]['dietname'];

        dietMap[diets[i]['dietname']] = diets[i];

        a.addEventListener("click", () => {itemClickEvent(a, "user")});

        element.appendChild(a);

        i++;
    }
}
async function loadRecs(element){
    const diets = await (await fetch('/diets/allDiets')).json();
    
    let i=0;
    while(i<5 && i<diets.length){
        //Need this to filter out the diets from the current user
        //if(diets[i]['userid'] !== CURRENT USER ID){
        const a = document.createElement('a');
        a.href = '#'; //TODO
        a.classList.add('list-group-item', 'list-group-item-action');
        a.innerText = diets[i]['dietname'];

        dietMap[diets[i]['dietname']] = diets[i];

        a.addEventListener("click", () => {itemClickEvent(a, "rec")});

        element.appendChild(a);

        i++;
        //}
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

        const di = dietMap[element.innerText];
        const nameOfDiet = di.dietname;
        const q1 = await fetch('/users/'+di['userid']);
        const creator = await q1.json();

        const q2 = await fetch('/diets/' + di.dietid + '/recipes');
        const recipes = await q2.json();

        left.classList.add("col-5");

        if(!right){
            right = document.createElement("div");
            right.classList.add("col-7", "container");
        }
        
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
        right.id = "readmore";

        const btn = document.createElement("button");
        if(type === "rec"){
            btn.type = "button";
            btn.classList.add("btn", "btn-success");
            btn.innerText = "Add This Diet";
            btn.addEventListener("click", async () => {
                let newDiet = await fetch('diets/create', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        'dietName' : nameOfDiet
                    }),
                });
                if(newDiet.ok){
                    alert("Diet added!");
                }
                else{
                    alert("failed to add diet, sorry!");
                }
                newDiet = await newDiet.json();
            });
        }
        else{
            btn.classList.add("btn", "btn-danger");
            btn.innerText = "Delete Diet"
            btn.addEventListener("click", async () => {
                let res = await fetch(`diets/delete/${di.dietid}`,{
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'DELETE'
                });
                if(res.ok)
                    alert("Diet deleted!");
                else
                    alert("failed to delete diet, sorry!");
                res = await res.json();
            });
        }

        right.appendChild(btn);

        document.getElementById("container-a").appendChild(right);
    }
}