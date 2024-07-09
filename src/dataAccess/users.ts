import { IDbResult } from '../helpers/dbResult.ts'
import IUserModel from '../models/user.ts'
import { IDataAccess } from './iDataAccess.ts'

export interface IUsersDataAccess extends IDataAccess<IUserModel> {
    getUserByUsername(username: string): Promise<IDbResult<IUserModel>> 
}

export default class UsersDataAccess implements IUsersDataAccess{
    dataAccess: IUsersDataAccess

    constructor(dataAccess: IUsersDataAccess) {
        this.dataAccess = dataAccess
    }   

    updateById(id: string, dataUpdated: Partial<IUserModel>): Promise<IDbResult<IUserModel>> {
        return this.dataAccess.updateById(id, dataUpdated)
    }

    getUserByUsername(username: string): Promise<IDbResult<IUserModel>> {
        return this.dataAccess.getUserByUsername(username)
    }

    getAll() {
        return this.dataAccess.getAll()
    }

    deleteById(id: string) {
        return this.dataAccess.deleteById(id)
    }

    getById(id: string) {
        return this.dataAccess.getById(id)
    }

    addOne(dataToInsert: Partial<IUserModel>) {
        return this.dataAccess.addOne(dataToInsert)
    }
}