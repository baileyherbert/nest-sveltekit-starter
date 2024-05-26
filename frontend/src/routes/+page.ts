export async function load(event) {
	const response = await event.fetch('/api/test');
	return response.json();
}
