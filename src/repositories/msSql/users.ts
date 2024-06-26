import { IUsersDataAccess } from "../../dataAccess/users.ts"
import { IDbResult } from "../../helpers/dbResult.ts"
import IUserModel from "../../models/user.ts"
import mssql, { ConnectionPool, IResult } from 'mssql'

export default class UsersMsSqlRepository implements IUsersDataAccess {
    pool: ConnectionPool

    constructor(pool: ConnectionPool) {
        this.pool = pool
    }

    getAll(): Promise<IDbResult<IUserModel>> {
        return new Promise(async (resolve, reject) => {
            const query = "SELECT * FROM [Pazitto-Users]"
            await this.pool.query(query)
            .then(({ recordset }: IResult<IUserModel>) => {
                resolve({success: true, data: recordset}) 
            })
            .catch((error: any) => {
                reject({success: false, error})
            })
        })
    }

    getById(id: string): Promise<IDbResult<IUserModel>> {
        return new Promise(async (resolve, reject) => {
            const query = `SELECT * FROM [Pazitto-Users] WHERE id = ${id}`
            await this.pool.query(query)
            .then(({ recordset, rowsAffected }: IResult<IUserModel>) => {
                if(!rowsAffected[0]) {
                    resolve({success: false, notFound: true})
                }
                resolve({success: true, data: recordset})
            })
            .catch((error: any) => {
                reject({success: false, error})
            })
        })
    }

    deleteById(id: string): Promise<IDbResult<IUserModel>> {
        return new Promise(async (resolve, reject) => {
            const query = `DELETE FROM [Pazitto-Users] WHERE id = ${id}`
            await this.pool.query(query)
            .then(({ rowsAffected }: IResult<IUserModel>) => {
                if(!rowsAffected[0]) {
                    resolve({success: false, notFound: true})
                }
                resolve({success: true})
            })
            .catch((error: any) => {
                reject({success: false, error})
            })
        })
    }

    addOne({ password, username, salt } : IUserModel): Promise<IDbResult<IUserModel>> {
        return new Promise(async (resolve, reject) => {
            const query = `INSERT INTO [Pazitto-Users] ([username],[password],[salt]) VALUES (@username, @password, @salt)`
            await this.pool
            .request()
            .input('username', mssql.VarChar, username)
            .input('password', mssql.VarChar, password)
            .input('salt', mssql.VarChar, salt)
            .query(query)
            .then((res: any) => {
                if(res.rowsAffected[0]) {
                    resolve({success: true}) 
                } else {
                    throw new Error
                }
            })
            .catch((error: any) => {
                reject({success: false, error})
            })
        })
    }

    updateById(id: string, dataUpdated: Partial<IUserModel>): Promise<IDbResult<IUserModel>> {
        return new Promise(async (resolve, reject) => {
            const fields = Object
            .keys(dataUpdated)
            .map(key => `[${key}] = ${key}`)
            .join(', ')
            
            const query = `UPDATE [Pazitto-Users] SET ${fields} WHERE id = ${id}`            
            await this.pool.query(query)
            .then((res: any) => {
                if(res.rowsAffected[0]) {
                    resolve({success: true}) 
                } else {
                    throw new Error
                }
            })
            .catch((error: any) => {
                reject({success: false, error})
            })
        })
    }
    
    getUserByUsername(username: string): Promise<IDbResult<IUserModel>> {
        return new Promise(async (resolve, reject) => {
            const query = `SELECT * FROM [Pazitto-Users] WHERE username = @username`
            await this.pool
            .request()
            .input('username', username)
            .query(query)
            .then(({ recordset, rowsAffected }: IResult<IUserModel>) => {
                if(!rowsAffected[0]) {
                    resolve({success: false, notFound: true})
                }
                resolve({success: true, data: recordset})
            })
            .catch((error: any) => {
                console.log(error)
                reject({success: false, error})
            })
        })
    }
}