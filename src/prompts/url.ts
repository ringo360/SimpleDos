import consola from 'consola';
export async function inputURL() {
	const res = (await consola.prompt('Target URL (ex: https://google.com/)')) as string;
	consola.info('Checking...');
	if (!res || !res.startsWith('http')) {
		consola.error('Invalid input.');
		return inputURL();
	}
	return res;
}
