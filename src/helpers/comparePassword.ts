import crypto from 'crypto'

export default function comparePasswords(password: string | Buffer, userPassword: any, userSalt: any) {
    return new Promise((resolve) => {
        crypto.pbkdf2(password, userSalt.buffer, 310000, 16, 'sha256', 
        (error, hashedPassword) => {
            if (error) { 
                resolve({
                    success: false, 
                    error,
                }) 
            }
            
            if(!crypto.timingSafeEqual(userPassword.buffer, hashedPassword)) {
                resolve({
                    success: false, 
                    compareFail: true,
                }) 
            }

            resolve({
                success: true
            })
        })    
    })
}