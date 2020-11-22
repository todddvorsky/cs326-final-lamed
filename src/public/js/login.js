window.addEventListener("load", () =>{
    document.getElementById('login-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        console.log("logging in...");

        const data = {
            username: event.target.username,
            firstName: event.target.fname,
            lastName: event.target.lname,
            email: event.target.email,
            password: event.target.pwd            
        }

        await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        // if(res.ok){
        //     console.log(res);
        //     const html = await res.text();
        //     document.body.innerHTML = html;
        // }
    });
    
    document.getElementById('register-form').addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log("registering...");

        const data = {
            userId: event.target.username,
            firstName: event.target.fname,
            lastName: event.target.lname,
            email: event.target.email,
            password: event.target.pwd            
        }

        await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        // if(res.ok){
        //     console.log(res);
        //     const html = await res.text();
        //     document.body.innerHTML = html;
        // }
        
    });
});