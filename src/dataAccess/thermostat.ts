import IThermostatModel from "../models/thermostat.ts"
import { IDataAccess } from "./iDataAccess.ts"

export default class ThermostatDataAccess {
    dataAccess: IDataAccess<IThermostatModel>

    constructor(dataAccess: IDataAccess<IThermostatModel>) {
        this.dataAccess = dataAccess
    }   

    getAll() {
        return this.dataAccess.getAll()
    }

    deleteById(id: string) {
        return this.dataAccess.deleteById(id)
    }

    getById(id: string) {
        return this.dataAccess.getById(id)
    }

    addOne(dataToInsert: Partial<IThermostatModel>) {
        return this.dataAccess.addOne(dataToInsert)
    }
}