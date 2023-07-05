/* just a stub of what is normally executing a DB query */
export const query = async <T>(_: string, __: string, ___: string, _querySupplier: (db: any) => Promise<T>): Promise<T> => undefined as T;
