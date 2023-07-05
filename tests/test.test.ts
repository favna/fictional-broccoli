import type { Mock } from 'vitest';
import { dbConnectionMock, getLoadCycleId } from '../src/impl.js';
import { query } from '../src/query.js';

vi.mock('../src/query.js');
const queryMock = query as Mock;

beforeEach(() => {
	vi.restoreAllMocks();
	queryMock.mockImplementation(async (_, __, ___, supplier) => {
		return await supplier(dbConnectionMock);
	});
});

test('getLoadCycleId: GIVEN executionId THEN it retries the query', async () => {
	dbConnectionMock
		.mockReturnValue(Promise.reject('retry herpderp please'))
		.mockReturnValue(Promise.reject('retry derpherp please'))
		.mockReturnValue(Promise.reject('retry derpderp please'))
		.mockReturnValue(
			Promise.resolve([
				{
					job_execution_id: 556
				}
			])
		);
	const result = await getLoadCycleId('42', undefined);
	expect(result).toEqual(556);
});
