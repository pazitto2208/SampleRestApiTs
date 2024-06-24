import IUserModel from "../models/user.ts"
import UsersDataAccess, { IUsersDataAccess } from "../dataAccess/users.ts"

export interface IUserControllers {
    getUserByUsername(username: string): Promise<IUserModel | null> 
}

export default class UsersControllers extends UsersDataAccess implements IUserControllers {    
    constructor(dataAccess: IUsersDataAccess) {
        super(dataAccess)
    }

    async getUserByUsername(username: string): Promise<IUserModel | null> {
        return null
    }
}
