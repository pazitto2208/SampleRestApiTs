import { ObjectId } from 'mongodb'
import { Mongo } from '../database/mongo.ts'
import { IDataAccess } from './iDataAccess.ts'

export default class DataAccess<T> implements IDataAccess<T> {
    collectionName: string
    
    constructor(collectionName: string) {
        this.collectionName = collectionName
    }
    
    async getAll() {
        const result = await Mongo.db
        .collection(this.collectionName)
        .find({ })
        .toArray()

        return result
    }

    async getById(id: string) {
        const result = await Mongo.db
        .collection(this.collectionName)
        .findOne({ _id: new ObjectId(id) })

        return result
    }

    async deleteById (id: string) {
        const result = await Mongo.db
        .collection(this.collectionName)
        .deleteOne({ _id: new ObjectId(id) })

        return result
    }

    async addOne(dataToAdd: T) {
        const result = await Mongo.db
        .collection(this.collectionName)
        .insertOne(dataToAdd)

        return result
    }

    async updateById(id: string, dataUpdated: Partial<T>) {
        const result = await Mongo.db
        .collection(this.collectionName)
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: dataUpdated }
        )

        return result
    }
}