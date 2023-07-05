import postgres from 'postgres';

export const query = async <T>(
	databaseUrl: string,
	databaseUsername: string,
	databasePassword: string,
	querySupplier: (db: any) => Promise<T>
): Promise<T> => {
	const db = postgres(databaseUrl, {
		username: databaseUsername,
		password: databasePassword,
		max: 1
	});
	const result = await querySupplier(db);
	await db.end();
	return result;
};
