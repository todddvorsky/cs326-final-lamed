const currentUserID = 2;

document.getElementById('submit').addEventListener('click', async () => {
	if (
		!(
			document.getElementById('inputNameExercise').value ||
			document.getElementById('inputDescExercise').value ||
			document.getElementById('workoutName').value ||
			document.getElementById('tagName').value ||
			document.getElementById('inputSets').value ||
			document.getElementById('inputReps').value
		)
	) {
		alert('Please fill out all fields');
	}

	const workoutName = document.getElementById('workoutName').value;
	let workoutId = await fetch(
		`/users/workouts/${currentUserID}/${workoutName}`
	); // use req.params to get curr_user and workoutname
	// workoutId = await workoutId.json().workoutId;
	workoutId = await workoutId.json();
	if (workoutId.length) workoutId = workoutId[0].workoutid;
	console.log(workoutId);
	if (!workoutId) {
		console.log('hhhh');
		workoutId = await fetch('workouts/create', {
			// make sure the fetchs return id
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				workoutName,
				userId: currentUserID,
			}),
		});
		workoutId = await workoutId.json();
		workoutId = workoutId[0].workoutid;
		console.log('hh', workoutId);
	}

	await fetch('workouts/exercise/create', {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify({
			workoutId,
			name: document.getElementById('inputNameExercise').value,
			desc: document.getElementById('inputDescExercise').value,
			reps: document.getElementById('inputReps').value,
			sets: document.getElementById('inputSets').value,
			tags: document.getElementById('tagName').value,
		}),
	});
	document.getElementById('forms').reset();
});
