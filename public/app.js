document.addEventListener('click', (event) => {
	const id = event.target.dataset.id;
	const type = event.target.dataset.type;

	if (type === 'remove') {
		remove(id).then(() => {
			event.target.closest('li').remove();
		});
	} else if (type === 'edit') {
		const wrapper = event.target.closest('li');
		const textElement = wrapper.querySelector('span');

		const newTitle = prompt(
			'Введите новое название заметки:',
			textElement.textContent,
		);
		if (newTitle !== null) {
			edit(id, newTitle).then(() => {
				textElement.textContent = newTitle;
			});
		}
	}
});

async function remove(id) {
	await fetch(`/${id}`, { method: 'DELETE' });
}

async function edit(id, title) {
	await fetch(`/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ title }),
	});
}
