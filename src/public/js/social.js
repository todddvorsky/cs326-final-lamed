window.addEventListener("load", async function(){
    populateFriends();
});

async function populateFriends(){
    const response = await fetch("http://127.0.0.1:8080/users/");
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const db = await response.json();
    const names = db.users;
    console.log(db.users);
    for(let i = 0; i<names.length; i++){
        const newName = document.createElement("a");
        newName.innerHTML = names[i];
        newName.classList.add('dropdown-item');
        document.getElementById("dropdownDiv").appendChild(newName);
    }
}