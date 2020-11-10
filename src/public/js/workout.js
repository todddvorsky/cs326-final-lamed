// import { v4 as uuidv4 } from 'uuid';
// uuidv4();

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

	const exerciseID = '1111111'; // add id generator

	await fetch('/exercise/create', {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify({
			exerciseId: exerciseID,
			name: document.getElementById('inputNameExercise').value,
			desc: document.getElementById('inputDescExercise').value,
			reps: document.getElementById('inputReps').value,
			sets: document.getElementById('inputSets').value,
			tags: document.getElementById('tagName').value,
		}),
	});

	const workouts = await fetch('/allWorkouts');
	if (document.getElementById('workoutName').value in workouts) {
		await fetch('/update/:workout', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'PUT',
			body: JSON.stringify({
				workoutName: document.getElementById('workoutName').value, // maybe change to ID instead
				exerciseId: exerciseID,
			}),
		});
	} else {
		await fetch('/create', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				workoutId: '111111111', // add id generator
				workoutName: document.getElementById('workoutName').value,
				exercises: exerciseID,
			}),
		});
	}
});
