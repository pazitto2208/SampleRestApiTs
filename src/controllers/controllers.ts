import { IDataAccess } from "../dataAccess/iDataAccess.ts"
import { IControllers } from "./iControllers.ts"
import { elementNotFound, serverError, ok, IJsonResponse } from "../helpers/jsonResponses.ts"

export default class Controllers<T> implements IControllers {
    dataAccess: IDataAccess<T>
    
    constructor(dataAccess: IDataAccess<T>) {
        this.dataAccess = dataAccess
    }

    async addOne(dataToInsert: Partial<T>): Promise<IJsonResponse> {
        try {
            const { success, error, data } = await this.dataAccess.addOne(dataToInsert)

            if(success) {
                return ok(data, 200)
            } else {
                throw new Error(error?.message)
            }
        } catch (err) {
            return serverError(err)
        }
    }

    async deleteById(id: string): Promise<IJsonResponse> {
        try {
            const { success, error, data, notFound } = await this.dataAccess.deleteById(id)

            if(success) {
                return ok(data, 200)
            } else if (notFound) {
                return elementNotFound()
            } else {
                throw new Error(error?.message)
            }
        } catch (err) {
            return serverError(err)
        }
    }

    async getById(id: string): Promise<IJsonResponse> {
        try {
            const { success, error, data, notFound } = await this.dataAccess.getById(id)

            if(success) {
                return ok(data, 200)
            } else if (notFound) {
                return elementNotFound()
            } else {
                throw new Error(error?.message)
            }
        } catch (err) {
            return serverError(err)
        }
    }

    async getAll() {
        try {
            const { success, error, data } = await this.dataAccess.getAll()

            if(success) {
                return ok(data, 200)
            } else {
                throw new Error(error?.message)
            }
        } catch (err) {
            return serverError(err)
        }
    }

}