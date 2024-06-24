import mssql from 'mssql'

export const MsSqlClient: any = {
    async connect(connectionString: string) {
        try {
            const client = await mssql.connect(connectionString)
            this.db = client
            console.log('Connected to the database successfully')
        } catch (error) {
            console.log(error)
        }
    }
}