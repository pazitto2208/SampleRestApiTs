import { NextFunction, Request, Response } from 'express'
import JsowWebToken from '../helpers/jsonWebToken.ts'
import { unauthorized } from '../helpers/jsonResponses.ts'

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {    
        if(!req.headers.authorization) {
            throw new Error
        }

        const { token, ...user } = JSON.parse(req.headers.authorization)
                
        if (!token) {
            throw new Error
        }
    
        const jwt = new JsowWebToken()
    
        const verifyResult = await jwt.verify(token, user)
            
        if(!verifyResult.success || !verifyResult.user) {
            throw new Error
        }
        
        next()
        
    } catch (error) {
        const unauthorizedResponse = unauthorized()

        return res.status(unauthorizedResponse.statusCode).send(unauthorizedResponse)
    }
}