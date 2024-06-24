import { config } from 'dotenv'
import httpServer from './http/server.ts'
import { MsSqlClient } from './database/msSql.ts'

config()

async function main () {
    await MsSqlClient.connect(process.env.MS_SQL_CS)
    
    httpServer()
}

main()