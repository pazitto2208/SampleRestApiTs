import { IRecordSet } from 'mssql'

export interface IDbResult<T> {
    success: boolean
    notFound?: boolean
    data?: IRecordSet<T>
    error?: Error
}

