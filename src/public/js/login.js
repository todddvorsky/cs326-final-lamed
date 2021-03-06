window.addEventListener('load', () => {
	document
		.getElementById('login-form')
		.addEventListener('submit', async function (event) {
			event.preventDefault();

			const data = {
				username: event.target.email.value,
				password: event.target.pwd.value,
			};

			const res = await fetch('/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data), // body data type must match "Content-Type" header
			});
			if (res.ok) {
				const html = await res.text();
				document.body.innerHTML = html;
			} else {
				alert('Failed to login');
			}
		});

	document
		.getElementById('register-form')
		.addEventListener('submit', async function (event) {
			event.preventDefault();

			const data = {
				fname: event.target.fname.value,
				lname: event.target.lname.value,
				username: event.target.email.value,
				password: event.target.pwd.value,
			};

			const res = await fetch('/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data), // body data type must match "Content-Type" header
			});

			if (res.ok) {
				const html = await res.text();
				document.body.innerHTML = html;
			} else {
				alert('Failed to register');
			}
		});
});
