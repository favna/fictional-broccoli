import { retry } from './async-retry.js';
import { query } from './query.js';


export async function getLoadCycleId(executionId: string, parentExecutionId: string | undefined): Promise<string | undefined> {
	const executionIds = [executionId];

	if (parentExecutionId) {
		executionIds.push(parentExecutionId);
	}

	return await doWithConnection(async (db) => {
		const result = await db`TEMPLATE SQL CODE IRRELEVANT FOR THIS PARTICULAR TEST`;
		return result[0]?.job_execution_id;
	});
}

export const dbConnectionMock = vi.fn();
async function doWithConnection<T>(querySupplier: (db: any) => Promise<T>) {
	return await retry(async () => query('', '', '', querySupplier), 10);
}
