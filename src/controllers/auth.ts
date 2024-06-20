import { notFound, ok, serverError } from "../helpers/jsonResponses.ts"
import IUserModel from "../models/user.ts"
import hashPassword from "../helpers/hashPassword.ts"
import comparePasswords from "../helpers/comparePassword.ts"
import JsowWebToken from "../helpers/jsonWebToken.ts"
import Controllers from "./controllers.ts"
import IUserDataAccess from "../dataAccess/users.ts"

export default class AuthControllers extends Controllers<IUserModel> {
    jwt: JsowWebToken
    
    constructor(dataAccess: IUserDataAccess) {
        super(dataAccess)
        this.jwt = new JsowWebToken()
    }

    async login(userData: IUserModel) {
        try {
            const user: IUserModel = await (this.dataAccess as IUserDataAccess).getUser(userData.username)

            if(!user) { return notFound() }

            const hashCompareResult: any = await comparePasswords(userData.password, user.password, user.salt)
                        
            if(!hashCompareResult.success || hashCompareResult.compareFail) {
                return notFound()
            }
            
            const { password, salt, ...userSanitized } = user

            userSanitized.token = this.jwt.generate(userSanitized)
            
            return ok<Partial<IUserModel>>(userSanitized, 200, 'Login successful')
        } catch (error) { 
            return serverError(error) 
        }
    }

    async signup(userData: IUserModel) {
        try {
            const user = await (this.dataAccess as IUserDataAccess).getUser(userData.username)

            if(user) { return this.login(userData) }
                
            const hashResult = await hashPassword(userData.password)
            
            if(!hashResult.success || (!hashResult.password || !hashResult.salt)) {
                return serverError(hashResult.error)
            }

            const addUserResult = await (this.dataAccess as IUserDataAccess).addOne({ 
                ...userData,
                password: hashResult.password,
                salt: hashResult.salt,
            })

            if(!addUserResult.insertedId) {
                return serverError(new Error('Error during user registration'))
            }

            const newUserData = {
                ...userData,
                password: hashResult.password,
                salt: hashResult.salt,
                _id: String(addUserResult.insertedId)
            }
            
            const { password, salt, ...userSanitized } = newUserData

            userSanitized.token = this.jwt.generate(userSanitized)

            return ok<Partial<IUserModel>>(userSanitized, 200, 'Signup and login successful')
        } catch (error) {
            return serverError(error)
        }
    }
}