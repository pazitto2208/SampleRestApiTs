import IUserModel from "../models/user.ts"
import jwt from 'jsonwebtoken'

export default class JsowWebToken {
    jwtSecret = 'secret'

    generate(user: Partial<IUserModel>) {
        const { password, salt, ...userSanitized } = user

        return jwt.sign(userSanitized, this.jwtSecret)
    }
    
    verify(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.jwtSecret, async (err, decoded) => {
                if (err && decoded) { 
                    reject({ 
                        invalidToken: true, 
                        success: false 
                    }) 
                }

                resolve({
                    success: true,
                    user: decoded
                })
            })
        })
    }
}