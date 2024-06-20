import { IJsonResponse } from '../helpers/jsonResponses.ts'

export interface IControllers<T> {
    getAll(): Promise<IJsonResponse<T> | IJsonResponse<undefined>>
    getById(id: string): Promise<IJsonResponse<T> | IJsonResponse<undefined>>
    deleteById(id: string): Promise<IJsonResponse<undefined> | IJsonResponse<{ id: string }>>
    updateById(id: string, dataUpdated: Partial<T>): Promise<IJsonResponse<undefined> | IJsonResponse<{ id: string }>>
}