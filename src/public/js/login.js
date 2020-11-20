window.addEventListener("load", () =>{
    document.getElementById('login-form').addEventListener('submit', (event) =>{
        event.preventDefault();
        //TODO
        console.log("logging in...");
    });
    
    document.getElementById('register-form').addEventListener('submit', (event) =>{
        event.preventDefault();
        //TODO
        console.log("registering...");
    });
});