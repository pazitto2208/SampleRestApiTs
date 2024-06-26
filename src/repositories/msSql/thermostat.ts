import { ConnectionPool, IResult } from "mssql"
import { IDbResult } from "../../helpers/dbResult.ts"
import { IDataAccess } from "../../dataAccess/iDataAccess.ts"
import IThermostatModel from "../../models/thermostat.ts"

export default class ThermostatMsSqlRepository implements IDataAccess<IThermostatModel>{
    pool: ConnectionPool

    constructor(pool: ConnectionPool) {
        this.pool = pool
    }

    addOne(dataToInsert: Partial<IThermostatModel>): Promise<IDbResult<IThermostatModel>> {
        throw new Error("Method not implemented.")
    }

    getAll(): Promise<IDbResult<IThermostatModel>> {
        return new Promise(async (resolve, reject) => {
            const query = "SELECT [id], [temperature], [cooler_status] AS coolerStatus, [created_at] AS createdAt FROM [Pazitto-Thermostat]"
            await this.pool.query(query)
            .then(({ recordset }: IResult<IThermostatModel>) => {
                resolve({success: true, data: recordset}) 
            })
            .catch((error: any) => {
                reject({success: false, error})
            })
        })
    }

    getById(id: string): Promise<IDbResult<IThermostatModel>> {
        return new Promise(async (resolve, reject) => {
            const query = `SELECT * FROM [Pazitto-Thermostat] WHERE id = ${id}`
            await this.pool.query(query)
            .then(({ recordset, rowsAffected }: IResult<IThermostatModel>) => {
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

    deleteById(id: string): Promise<IDbResult<IThermostatModel>> {
        return new Promise(async (resolve, reject) => {
            const query = `DELETE FROM [Pazitto-Thermostat] WHERE id = ${id}`
            await this.pool.query(query)
            .then(({ rowsAffected }: IResult<IThermostatModel>) => {
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

    updateById(id: string, dataUpdated: Partial<IThermostatModel>): Promise<IDbResult<IThermostatModel>> {
        return new Promise(async (resolve, reject) => {
            const fields = Object
            .keys(dataUpdated)
            .map(key => `[${key}] = ${key}`)
            .join(', ')
            
            const query = `UPDATE [Pazitto-Thermostat] SET ${fields} WHERE id = ${id}`            
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
}