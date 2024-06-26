import Controllers from "./controllers.ts"
import { IDataAccess } from "../dataAccess/iDataAccess.ts"
import IThermostatModel from "../models/thermostat.ts"

export default class UsersControllers extends Controllers<IThermostatModel> {    
    constructor(dataAccess: IDataAccess<IThermostatModel>) {
        super(dataAccess)
    } 
}
