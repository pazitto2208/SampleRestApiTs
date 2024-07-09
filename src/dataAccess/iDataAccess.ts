import { IDbResult } from "../helpers/dbResult.ts"

export interface IDataAccess<T> {
    deleteById(id: string): Promise<IDbResult<T>>
    getById(id: string): Promise<IDbResult<T>>
    getAll(): Promise<IDbResult<T>>
    addOne(dataToInsert: Partial<T>): Promise<IDbResult<T>>
    updateById(id: string, dataUpdated: Partial<T>): Promise<IDbResult<T>>
}