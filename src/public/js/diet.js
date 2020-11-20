document.getElementById('submit').addEventListener('click', async () => {
	if (
		!(
			document.getElementById('inputNameRecipe').value ||
			document.getElementById('inputDescRecipe').value ||
			document.getElementById('dietName').value ||
			document.getElementById('tagName').value ||
			document.getElementById('ingredients').value
		)
	) {
		alert('Please fill out all fields');
	} else {
		const recipeID = '1111111'; // add id generator
		await fetch('diets/recipe/create', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				recipeId: recipeID,
				name: document.getElementById('inputNameRecipe').value,
				desc: document.getElementById('inputDescRecipe').value,
				ingredients: document.getElementById('ingredients').value,
				tags: document.getElementById('tagName').value,
			}),
		});

		const diets = await (await fetch('/diets/allDiets')).json(); // change to only user's diets
		if (document.getElementById('dietName').value in diets) {
			await fetch('diets/update/:diet', {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'PUT',
				body: JSON.stringify({
					dietName: document.getElementById('dietName').value, // maybe change to ID instead
					recipeId: recipeID,
				}),
			});
		} else {
			await fetch('/diets/create', {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({
					dietId: '111111111', // add id generator
					dietName: document.getElementById('dietName').value,
					recipes: recipeID,
				}),
			});
		}
	}
	document.getElementById('forms').reset();
});
