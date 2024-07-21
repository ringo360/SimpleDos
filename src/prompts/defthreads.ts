import consola from 'consola';
export async function DefThreads() {
	const res = await consola.prompt('Thread count (default: 100)', {
		initial: '100',
	});
	consola.info('Checking...');
	const threadCount = parseInt(res, 10);
	if (isNaN(threadCount)) {
		consola.error('Invalid input.');
		return DefThreads();
	}
	return threadCount;
}
