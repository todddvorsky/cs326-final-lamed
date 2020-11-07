async function dietNames(){
    const response = await fetch("http://127.0.0.1:8080/diets/");
    if(response.ok){
        console.log(response.json());
    }
    else{
        console.log("error with fetching diets");
    }
}

window.addEventListener("load", dietNames);
//dietNames();