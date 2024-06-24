import { IUsersDataAccess } from "../../dataAccess/users.ts"
import IUserModel from "../../models/user.ts"
import mssql from 'mssql'

export default class UsersMsSqlRepository implements IUsersDataAccess {
    msSqlClient: any

    constructor(msSqlClient: any) {
        this.msSqlClient = msSqlClient
    }

    async getById(id: string): Promise<IUserModel | null> {
        return new Promise(async (resolve, reject) => {
            const query = `SELECT * FROM [Pazitto-Users] WHERE id = ${id}`
            await this.msSqlClient.db.query(query)
            .then((result: any) => {
                console.log(result)
                resolve(result.recordset[0])
            })
            .catch((error: any) => {
                reject(new Error(error))
            })
        })
    }

    deleteById(id: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const query = `DELETE FROM [Pazitto-Users] WHERE id = ${id}`
            await this.msSqlClient.db.query(query)
            .then((result: any) => {
                console.log(result)
                resolve(result)
            })
            .catch((error: any) => {
                reject(new Error(error))
            })
        })
    }

    addOne({ password, username, salt } : IUserModel): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const query = `INSERT INTO [Pazitto-Users] ([username],[password],[salt]) VALUES (@username, @password, @salt)`
            console.log(query)
            await this.msSqlClient.db.request()
            .input('username', mssql.VarChar, username)
            .input('password', mssql.VarChar, password)
            .input('salt', mssql.VarChar, salt)
            .query(query)
            .then((res: any) => {
                if(res.rowsAffected[0]) {
                    resolve({
                        success: true,
                        rowsAffected: res.rowsAffected[0]
                    }) 
                }
            })
            .catch((error: any) => {
                reject({
                    success: false,
                    rowsAffected: 0,
                    error
                })
            })
        })
    }

    updateById(id: string, dataUpdated: Partial<IUserModel>): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const fields = Object
            .keys(dataUpdated)
            .map(key => `[${key}] = ${key}`)
            .join(', ')
            
            const query = `UPDATE [Pazitto-Users] SET ${fields} WHERE id = ${id}`            
            await this.msSqlClient.db.query(query)
            .then((result: any) => {
                console.log(result)
                resolve(result) 
            })
            .catch((error: any) => {
                reject(error)
            })
        })
    }
    
    getUserByUsername(username: string): Promise<IUserModel | null> {
        return new Promise(async (resolve, reject) => {
            const query = `SELECT * FROM [Pazitto-Users] WHERE username = ${username}`
            await this.msSqlClient.db.query(query)
            .then((result: any) => {
                console.log(result)
                resolve(result.recordset[0])
            })
            .catch((error: any) => {
                reject(new Error(error))
            })
        })
    }

    getAll(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const query = "SELECT * FROM [Pazitto-Users]"
            await this.msSqlClient.db.query(query)
            .then((result: any) => {
                console.log(result)
                resolve(result) 
            })
            .catch((error: any) => {
                reject(error)
            })
        })
    }
    

}