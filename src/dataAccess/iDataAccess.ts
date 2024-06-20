export interface IDataAccess<T> {
    collectionName: string
    getAll(): Promise<T[]>
    getById(id: string): Promise<T | null>
    deleteById(id: string): Promise<{ deletedCount: number }>
    addOne(dataToAdd: T): Promise<{ insertedId: string }>
    updateById(id: string, dataUpdated: Partial<T>): Promise<{ modifiedCount: number }>
}