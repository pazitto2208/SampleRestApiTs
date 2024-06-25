import { MsSqlClient } from './database/msSql.ts'
import httpServer from './http/server.ts'

async function main () {
    await MsSqlClient.init()

    httpServer()
}

main()