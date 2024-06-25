import { IJsonResponse } from "../helpers/jsonResponses.ts"

export interface IControllers{
    getAll(): Promise<IJsonResponse>
    deleteById(id: string): Promise<IJsonResponse>
    getById(id: string): Promise<IJsonResponse>
    addOne(dataToInsert: any): Promise<IJsonResponse>
}