window.addEventListener("load", () =>{
    document.getElementById('login-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        //TODO
        console.log("logging in...");

        const data = {
            email: event.target.email.value,
            password: event.target.pwd.value           
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
    
    document.getElementById('register-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        //TODO
        console.log("registering...");

        const data = {
            fname: event.target.fname.value,
            lname: event.target.lname.value,
            email: event.target.email.value,
            password: event.target.pwd.value            
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