import IUserModel from '../models/user.ts'
import { IDataAccess } from './iDataAccess.ts'

export interface IUsersDataAccess extends IDataAccess<IUserModel> {
    getUserByUsername(username: string): Promise<IUserModel | null> 
}

export default class UsersDataAccess {
    dataAccess: IUsersDataAccess

    constructor(dataAccess: IUsersDataAccess) {
        this.dataAccess = dataAccess
    }   

    getUserByUsername(username: string): Promise<IUserModel | null> {
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