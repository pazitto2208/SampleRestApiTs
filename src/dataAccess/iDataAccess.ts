import { IDbResult } from "../repositories/msSql/users.ts"

export interface IDataAccess<T> {
    deleteById(id: string): Promise<IDbResult<T>>
    getById(id: string): Promise<IDbResult<T>>
    getAll(): Promise<IDbResult<T>>
    addOne(dataToInsert: Partial<T>): Promise<IDbResult<T>>
}