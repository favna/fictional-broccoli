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

test('sample test name', async () => {
	dbConnectionMock
		.mockRejectedValue('retry herpderp please')
		.mockRejectedValue('retry derpherp please')
		.mockRejectedValue('retry derpderp please')
		.mockResolvedValue(
			[
				{
					job_execution_id: 556
				}
			]
		);
	const result = getLoadCycleId('42', undefined);
	await expect(result).resolves.toEqual(556);
});
