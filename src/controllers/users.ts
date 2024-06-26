import IUserModel from "../models/user.ts"
import { IUsersDataAccess } from "../dataAccess/users.ts"
import Controllers from "./controllers.ts"
import { IControllers } from "./iControllers.ts"
import { IJsonResponse, elementNotFound, ok, serverError } from "../helpers/jsonResponses.ts"

export interface IUserControllers extends IControllers {
    getUserByUsername(username: string): Promise<IJsonResponse> 
}

export default class UsersControllers extends Controllers<IUserModel> implements IUserControllers {
    userDataAccess: IUsersDataAccess
    
    constructor(dataAccess: IUsersDataAccess) {
        super(dataAccess)
        this.userDataAccess = dataAccess
    } 

    async getUserByUsername(username: string): Promise<IJsonResponse> {
        try {
            const { success, error, data, notFound } = await this.userDataAccess.getUserByUsername(username)

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
}
