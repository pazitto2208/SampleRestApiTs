import IUserModel from "../models/user.ts"
import jwt from 'jsonwebtoken'

export default class JsowWebToken {
    jwtSecret = 'secret'

    generate(user: Partial<IUserModel>) {
        const { password, salt, ...userSanitized } = user

        return jwt.sign(userSanitized, this.jwtSecret)
    }
    
    verify(token: string, user: IUserModel): Promise<{ success: boolean, user?: IUserModel }> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.jwtSecret, (err, userDecoded) => {
                if (err || !userDecoded) { 
                    reject({ 
                        success: false 
                    }) 
                }

                if ((userDecoded as IUserModel).id !== user.id) {
                    reject({ 
                        success: false 
                    })
                }

                resolve({
                    success: true,
                    user: userDecoded as IUserModel
                })
            })
        })
    }
}