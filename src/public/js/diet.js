const currentUserID = 1;

let tag;
document.getElementById('breakfast').addEventListener('click', async () => {
	tag = 'breakfast';
});
document.getElementById('lunch').addEventListener('click', async () => {
	tag = 'lunch';
});
document.getElementById('dinner').addEventListener('click', async () => {
	tag = 'dinner';
});
document.getElementById('submit').addEventListener('click', async () => {
	if (
		!(
			document.getElementById('inputNameRecipe').value &&
			document.getElementById('inputDescRecipe').value &&
			document.getElementById('dietName').value &&
			tag &&
			document.getElementById('ingredients').value
		)
	) {
		alert('Please fill out all fields');
	} else {
		const dietName = document.getElementById('dietName').value;
		let dietId = await fetch(`/users/diets/${currentUserID}/${dietName}`); // use req.params to get curr_user and workoutname
		dietId = await dietId.json();
		if (dietId.length) dietId = dietId[0].dietid;

		if (dietId.constructor === Array) {
			dietId = await fetch('diets/create', {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({
					dietName,
					userId: currentUserID,
				}),
			});
			dietId = await dietId.json();
			dietId = dietId[0].dietid;
		}
		console.log(dietId);
		await fetch('diets/recipe/create', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				dietId,
				name: document.getElementById('inputNameRecipe').value,
				desc: document.getElementById('inputDescRecipe').value,
				ingredients: document.getElementById('ingredients').value,
				tags: tag,
			}),
		});

		document.getElementById('forms').reset();
		tag = '';
	}
});
