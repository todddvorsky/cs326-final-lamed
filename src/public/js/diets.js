window.addEventListener('load', async function () {
	await loadUserWorkouts(document.getElementById('users-container'));
	loadRecs(document.getElementById('recs-container'));
});

const dietMap = {};
let curSelection = null;

async function loadUserWorkouts(element) {
	element.innerHTML = '';

	// get the users posted diets
	const diets = await (await fetch('/diets/userDiets')).json();
	if (!diets || diets.length === 0) {
		element.innerHTML = '<i>You have not posted any diets</i>';
		return;
	}

	for (let i = 0; i < 20 && i < diets.length; i += 1) {
		const a = document.createElement('a');
		a.href = '#';
		a.classList.add('list-group-item', 'list-group-item-action');
		a.innerText = diets[i].dietname;

		dietMap[diets[i].dietname] = diets[i];

		a.addEventListener('click', () => {
			itemClickEvent(a, 'user');
		});

		element.appendChild(a);
	}
}
async function loadRecs(element) {
	const diets = await (await fetch('/diets/allDiets')).json();

	let count = 20;
	for (let i = 0; i < count && i < diets.length; i += 1) {
		if (filterHelper(diets[i].dietid)) {
			const a = document.createElement('a');
			a.href = '#';
			a.classList.add('list-group-item', 'list-group-item-action');
			a.innerText = diets[i].dietname;

			dietMap[diets[i].dietname] = diets[i];

			a.addEventListener('click', () => {
				itemClickEvent(a, 'rec');
			});

			element.appendChild(a);
		} else {
			count += 1;
		}
	}
}
function filterHelper(id) {
	const vals = Object.values(dietMap);
	for (let i = 0; i < vals.length; i += 1) {
		if (vals[i].dietid === id) {
			return false;
		}
	}
	return true;
}

async function itemClickEvent(element, type) {
	const left = document.getElementById('container-b');
	let right = document.getElementById('readmore');

	if (curSelection && curSelection === element) {
		left.classList.remove('col-5');
		curSelection = null;

		if (right) {
			right.remove();
		}
	} else {
		curSelection = element;

		const di = dietMap[element.innerText];
		const q1 = await fetch(`/users/${di.userid}`);
		const creator = await q1.json();

		const q2 = await fetch(`/diets/${di.dietid}/recipes`);
		const recipes = await q2.json();

		left.classList.add('col-5');

		if (!right) {
			right = document.createElement('div');
			right.classList.add('col-7', 'container');
		}

		let html = '';
		html += `<h2><u>${element.innerText}</u></h2>`;
		html += `<p><i>By ${creator.firstname} ${creator.lastname}</i></p>`;
		html += '<h4>Recipes:<h4>';
		for (let i = 0; i < recipes.length; i += 1) {
			html += '<hr class="dotted">';
			const r = recipes[i];
			html += `<p><b>${r.recipename}</b></p>`;
			html += `<p>${r.description}</p>`;
			html += `<p><u>Ingredients:</u><br/>${r.ingredients}</p>`;
			html += `<p><u>Tag:</u><br/>${r.tag}</p>`;
		}

		right.innerHTML = html;
		right.id = 'readmore';

		const btn = document.createElement('button');
		if (type === 'rec') {
			btn.type = 'button';
			btn.classList.add('btn', 'btn-success');
			btn.innerText = 'Add This Diet';
			btn.addEventListener('click', async () => {
				const newDiet = await fetch('diets/add', {
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'POST',
					body: JSON.stringify({
						dietid: di.dietid,
						dietName: di.dietname,
					}),
				});
				if (newDiet.ok) {
					alert('Diet added!');
				} else {
					alert('failed to add diet, sorry!');
				}
				location.reload();
			});
		} else {
			btn.classList.add('btn', 'btn-danger', 'browse-btn');
			btn.innerText = 'Delete Diet';
			btn.addEventListener('click', async () => {
				const res = await fetch(`diets/delete/${di.dietid}`, {
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'DELETE',
				});
				if (res.ok) {
					alert('Diet deleted!');
				} else {
					alert('failed to delete diet, sorry!');
				}
				location.reload();
			});
		}

		right.appendChild(btn);

		document.getElementById('container-a').appendChild(right);
	}
}
