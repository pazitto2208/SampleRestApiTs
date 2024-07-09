import { IJsonResponse } from "../helpers/jsonResponses.ts"

export interface IControllers<T>{
    getAll(): Promise<IJsonResponse>
    deleteById(id: string): Promise<IJsonResponse>
    getById(id: string): Promise<IJsonResponse>
    addOne(dataToInsert: T): Promise<IJsonResponse>
    updateById(id: string, dataUpdated: T): Promise<IJsonResponse>
}