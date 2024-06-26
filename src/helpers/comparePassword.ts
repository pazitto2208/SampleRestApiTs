import crypto from 'crypto'

export interface IComparePasswordsResult {
    success: boolean
    error?: Error
    compareFail?: boolean
}

export default function comparePasswords(password: string, userPassword: string, userSalt: string): Promise<IComparePasswordsResult> {
    return new Promise((resolve) => {
        const userPasswordBuffer = Buffer.from(userPassword, 'base64');
        const userSaltBuffer = Buffer.from(userSalt, 'base64');

        crypto.pbkdf2(password, userSaltBuffer, 310000, 16, 'sha256', 
        (error, hashedPassword) => {
            if (error) { 
                resolve({
                    success: false, 
                    error,
                }) 
                return;
            }

            if (!crypto.timingSafeEqual(userPasswordBuffer, hashedPassword)) {
                resolve({
                    success: false,
                    compareFail: true,
                })
                return;
            }

            resolve({
                success: true
            })
        })    
    })
}
