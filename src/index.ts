import { config } from 'dotenv'
import httpServer from './http/server.ts'
import { Mongo } from './database/mongo.ts'

config()

async function main () {
    await Mongo.connect(process.env.MONGO_CS, process.env.MONGO_DB_NAME)
    
    httpServer()
}

main()