import consola from 'consola';
import color from 'picocolors';

const version = '1.0.0';

const threads = 100;

consola.info(`QuickSpammer v${version}`);

async function inputURL() {
	const res = (await consola.prompt('Target URL (ex: https://google.com/)')) as string;
	consola.info('Checking...');
	if (!res || !res.startsWith('http')) {
		consola.error('Invalid input.');
		return inputURL();
	}
	return res;
}

async function send() {
	try {
		//todo: fetch
	} catch (e) {
		consola.log(e);
	}
}

async function main() {
	const url = await inputURL();
}

main();
