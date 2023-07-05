import process from 'node:process';

export default async function () {
	process.on('unhandledRejection', (reason, p) => {
		console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
		// application specific logging, throwing an error, or other logic here
	});
}
