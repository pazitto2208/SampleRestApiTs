import { notFound, ok, serverError } from "../helpers/jsonResponses.ts"
import IUserModel from "../models/user.ts"
import hashPassword from "../helpers/hashPassword.ts"
import Controllers from "./controllers.ts"
import IUserDataAccess from "../dataAccess/users.ts"

export default class UsersControllers extends Controllers<IUserModel> {    
    constructor(dataAccess: IUserDataAccess) {
        super(dataAccess)
    }

    async getUser(username: string) {
        try {
            const user = await (this.dataAccess as IUserDataAccess).getUser(username)

            if(!user) {
                return notFound()
            }

            return ok<IUserModel>(user, 200, undefined)
        } catch (error) {
            return serverError(error)
        }
    }


    async updateUser(userId: string, userData: Partial<IUserModel>) {
        try {
            if(userData.password) {
                const hashResult = await hashPassword(userData.password)
                if(!hashResult.success || (!hashResult.password || !hashResult.salt)) {
                    throw new Error('Impossible to update user password')
                }
                userData.password = hashResult.password
                userData.salt = hashResult.salt
            }
            
            const { modifiedCount } = await this.dataAccess.updateById(userId, userData)
            
            if(!modifiedCount) {
                return notFound()
            }

            return ok({userId}, 200, 'User updated correctly')
        } catch (error) {
            return serverError(error)
        }
    }
}