import consola from 'consola';
import color from 'picocolors';

const version = '1.0.0';

consola.info(`QuickSpammer v${version}`);

async function inputURL() {
	const res = await consola.prompt('Target URL (ex: https://google.com/)');
	if ('') {
	}
}

async function main() {
	const url = await consola.prompt('Target URL');
}

main();
