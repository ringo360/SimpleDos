import consola from 'consola';
export async function reqMethod() {
	const res = await consola.prompt('Request Method', {
		type: 'select',
		options: ['GET', 'POST'],
		initial: 'GET',
	});
	return res;
}
