import { Mongo } from '../database/mongo.ts'
import IUserModel from '../models/user.ts'
import DataAccess from './dataAccess.ts'

export default interface IUserDataAccess extends DataAccess<IUserModel> {
    getUser(username: string): Promise<IUserModel | null>
}

export default class UsersDataAccess extends DataAccess<IUserModel> implements IUserDataAccess {    
    constructor() {
        super('Users')
    }
    
    async getUser(username: string) {
        const result = await Mongo.db
        .collection(this.collectionName)
        .findOne({ username: username })

        return result
    }    
}