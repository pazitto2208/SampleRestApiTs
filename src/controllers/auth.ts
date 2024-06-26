import { IJsonResponse, elementNotFound, ok, serverError } from "../helpers/jsonResponses.ts"
import JsowWebToken from "../helpers/jsonWebToken.ts"
import IUserModel from "../models/user.ts"
import Controllers from "./controllers.ts"
import { IUsersDataAccess } from "../dataAccess/users.ts"
import comparePasswords from "../helpers/comparePassword.ts"
import hashPassword from "../helpers/hashPassword.ts"

export interface IAuthControllers {
    jwt: JsowWebToken
    login(userData: IUserModel): Promise<IJsonResponse> 
    signup(userData: IUserModel): Promise<IJsonResponse> 
}

export default class AuthControllers extends Controllers<IUserModel> implements IAuthControllers {
    jwt: JsowWebToken
    userDataAccess: IUsersDataAccess

    constructor(dataAccess: IUsersDataAccess) {
        super(dataAccess)
        this.userDataAccess = dataAccess
        this.jwt = new JsowWebToken()
    }

    async login(userData: IUserModel): Promise<IJsonResponse> {
        try {
            const checkUserResult = await this.userDataAccess.getUserByUsername(userData.username)

            if(checkUserResult.error) {
                throw new Error(checkUserResult.error?.message)
            } else if (checkUserResult.notFound || !checkUserResult.data) {
                return elementNotFound()
            } 

            const [user] = checkUserResult.data

            const hashCompareResult = await comparePasswords(userData.password, user.password, user.salt)

            if(!hashCompareResult.success || hashCompareResult.compareFail) {
                return elementNotFound()
            }

            const { password, salt, ...userSanitized } = user

            const result = {
                ...userSanitized,
                token: this.jwt.generate(userSanitized)
            }
            
            return ok(result, 200, 'Login successful')

        } catch (err) {
            return serverError(err)
        }
    }

    async signup(userData: IUserModel): Promise<IJsonResponse> {
        try {
            const checkUserResult = await this.userDataAccess.getUserByUsername(userData.username)

            if(checkUserResult.error) {
                throw new Error(checkUserResult.error?.message)
            } 

            if(checkUserResult.data) {
                return this.login(userData)
            }

            const hashResult = await hashPassword(userData.password)
            
            if(!hashResult.success || (!hashResult.password || !hashResult.salt)) {
                return serverError(hashResult.error)
            }

            const addUserResult = await this.userDataAccess.addOne({ 
                ...userData,
                password: String(hashResult.password),
                salt: String(hashResult.salt),
            })

            if(!addUserResult.success) {
                return serverError(new Error('Error during user registration'))
            }

            const checkNewUser = await this.userDataAccess.getUserByUsername(userData.username)
            
            if(checkUserResult.error) {
                throw new Error(checkNewUser.error?.message)
            } else if (checkNewUser.notFound || !checkNewUser.data) {
                return elementNotFound()
            } 

            const [newUser] = checkNewUser.data
            
            const { password, salt, ...userSanitized } = newUser

            const result = {
                ...userSanitized,
                token: this.jwt.generate(userSanitized)
            }
            
            return ok(result, 200, 'Signup and login successful')

        } catch (err) {
            return serverError(err)
        }
    }    

}