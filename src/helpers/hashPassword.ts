import crypto from 'crypto'

interface IHashResult {
    success: boolean
    error?: string | Error 
    password: string
    salt: string
}

export default function hashPassword(
    password: string | Buffer, 
) {
    const salt = crypto.randomBytes(16)

    return new Promise<IHashResult>((resolve) => {
        crypto.pbkdf2(
            password, 
            salt, 
            310000, 
            16, 
            'sha256', 
            (error, hashedPassword) => {
                if (error) {
                    resolve({
                        success: false, 
                        error,
                        password: '',
                        salt: ''
                    })
                }

                resolve({ 
                    success: true, 
                    password: hashedPassword.toString('base64'), 
                    salt: salt.toString('base64')
                })
            }
        )
    })
}
