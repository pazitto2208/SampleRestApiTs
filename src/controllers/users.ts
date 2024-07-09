import IUserModel from "../models/user.ts"
import { IUsersDataAccess } from "../dataAccess/users.ts"
import Controllers from "./controllers.ts"
import { IControllers } from "./iControllers.ts"
import { IJsonResponse, elementNotFound, ok, serverError } from "../helpers/jsonResponses.ts"
import hashPassword from "../helpers/hashPassword.ts"

export interface IUserControllers extends IControllers<IUserModel>  {
    getUserByUsername(username: string): Promise<IJsonResponse> 
}

export default class UsersControllers extends Controllers<IUserModel> implements IUserControllers {
    dataAccess: IUsersDataAccess
    
    constructor(dataAccess: IUsersDataAccess) {
        super(dataAccess)
        this.dataAccess = dataAccess
    } 

    async getUserByUsername(username: string): Promise<IJsonResponse> {
        try {
            const { success, error, data, notFound } = await this.dataAccess.getUserByUsername(username)

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

    async updateUser(id: string, dataUpdated: Partial<IUserModel>): Promise<IJsonResponse> {
        try {
            if(dataUpdated.password) {
                return this.updateUserPassword(id, dataUpdated)
            } else {
                return this.updateById(id, dataUpdated)
            }
        } catch (err) {
            return serverError(err)
        }
    }

    async updateUserPassword(id: string, dataUpdated: Partial<IUserModel>): Promise<IJsonResponse> {
        try {
            if(dataUpdated.password) {
                const hashResult = await hashPassword(dataUpdated.password)
            
                if(!hashResult.success || (!hashResult.password || !hashResult.salt)) {
                    return serverError(hashResult.error)
                }

                return this.updateById(                     
                    id, 
                    {
                        ...dataUpdated, 
                        password:hashResult.password, 
                        salt: hashResult.salt
                    }
                )

            } else {
                return serverError('Error on update user')
            }
        } catch (err) {
            return serverError(err)
        }
    }
    
}
