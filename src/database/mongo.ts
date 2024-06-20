import { MongoClient } from 'mongodb'

export const Mongo: any = {
    async connect(mongoConnectionString: string, mongoDbName: string) {
        try {
            const client = new MongoClient(mongoConnectionString)
    
            await client.connect()
            const db = client.db(mongoDbName)

            this.db = db

            console.log('Connected to mongo!')
            
        } catch (error) {
            console.log({ text: 'Error during mongo connection', error })
        }
    }
}