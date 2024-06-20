import DataAccess from "../dataAccess/dataAccess.ts"
import { notFound, ok, serverError } from "../helpers/jsonResponses.ts"
import { IControllers } from "./iControllers.ts"

export default class Controllers<T> implements IControllers<T> {
    dataAccess: DataAccess<T>
    
    constructor(dataAccess: DataAccess<T>) {
        this.dataAccess = dataAccess
    }

    async getAll() {
        try {
            const items = await this.dataAccess.getAll()

            return ok<T>(items, 200, undefined)
        } catch (error) {
            return serverError(error)
        }
    }

    async getById(id: string) {
        try {
            const item = await this.dataAccess.getById(id)

            if(!item) {
                return notFound()
            }

            return ok<T>(item, 200, undefined)
        } catch (error) {
            return serverError(error)
        }
    }

    async deleteById(id: string) {
        try {
            const { deletedCount } = await this.dataAccess.deleteById(id)
            
            if(!deletedCount) {
                return notFound()
            }

            return ok({id}, 200, 'Item deleted correctly')
        } catch (error) {
            return serverError(error)
        }
    }

    async updateById(id: string, dataUpdated: Partial<T>) {
        try {
            const { modifiedCount } = await this.dataAccess.updateById(id, dataUpdated)
            
            if(!modifiedCount) {
                return notFound()
            }

            return ok({id}, 200, 'Item updated correctly')
        } catch (error) {
            return serverError(error)
        }
    }
}