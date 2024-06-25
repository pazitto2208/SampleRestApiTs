import mssql, { ConnectionPool } from 'mssql'
import { config } from 'dotenv'

config()

export const MsSqlClient: {
    pool: ConnectionPool,
    init(): Promise<void>
} = {
    pool: new mssql.ConnectionPool(String(process.env.MS_SQL_CS)),
    async init() {
        try {
            this.pool = await this.pool.connect()
            console.log('MsSql connected!')
        } catch (error) {
            console.log(error)
        }
    },
}
