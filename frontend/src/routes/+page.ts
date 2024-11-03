export async function load({ fetch }) {
	const response = await fetch('/api/test');
	return response.json();
}
