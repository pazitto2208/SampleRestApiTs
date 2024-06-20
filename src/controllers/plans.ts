import { IDataAccess } from "../dataAccess/iDataAccess.ts"
import IPlanModel from "../models/plan.ts"
import Controllers from "./controllers.ts"

export default class PlansControllers extends Controllers<IPlanModel> {
    constructor(dataAccess: IDataAccess<IPlanModel>) {
        super(dataAccess)
    }
}