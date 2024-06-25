import IUserModel from "../models/user.ts"
import { IUsersDataAccess } from "../dataAccess/users.ts"
import Controllers from "./controllers.ts"
import { IControllers } from "./iControllers.ts"

export interface IUserControllers {
    getUserByUsername(username: string): Promise<IUserModel | null> 
}

export default class UsersControllers extends Controllers<IUserModel> implements IUserControllers,IControllers {
    constructor(dataAccess: IUsersDataAccess) {
        super(dataAccess)
    } 

    async getUserByUsername(username: string): Promise<IUserModel | null> {
        return null
    }
}
