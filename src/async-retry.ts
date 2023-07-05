export async function retry<T>(cb: () => Promise<T> | T, retries: number): Promise<T> {
	if (retries < 1) throw new RangeError('Expected retries to be a number >= 1');

	let lastError: unknown;
	for (let i = 0; i < retries; ++i) {
		try {
			return await cb();
		} catch (error) {
			lastError = error;
		}
	}

	throw lastError;
}
