import IUserModel from '../models/user.ts'
import { IDbResult } from '../repositories/msSql/users.ts'
import { IDataAccess } from './iDataAccess.ts'

export interface IUsersDataAccess extends IDataAccess<IUserModel> {
    getUserByUsername(username: string): Promise<IDbResult<IUserModel>> 
}

export default class UsersDataAccess implements IUsersDataAccess{
    dataAccess: IUsersDataAccess

    constructor(dataAccess: IUsersDataAccess) {
        this.dataAccess = dataAccess
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