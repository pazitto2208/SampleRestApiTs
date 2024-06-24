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

    getAll(): Promise<IUserModel> {
        return this.dataAccess.getAll()
    }

    getById(id: string): Promise<IUserModel | null> {
        return this.dataAccess.getById(id)
    }

    deleteById(id: string): Promise<boolean> {
        return this.dataAccess.deleteById(id)
    }

    addOne(user: IUserModel): Promise<IUserModel> {
        return this.dataAccess.addOne(user)
    }

    updateById(id: string, user: IUserModel): Promise<IUserModel | null> {
        return this.dataAccess.updateById(id, user)
    }
}