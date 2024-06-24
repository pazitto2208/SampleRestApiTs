export interface IDataAccess<T> {
    getAll(): Promise<T>
    getById(id: string): Promise<T | null>
    deleteById(id: string): Promise<any>
    addOne(dataToAdd: Partial<T>): Promise<any>
    updateById(id: string, dataUpdated: Partial<T>): Promise<any>
}