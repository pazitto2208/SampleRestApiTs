import IPlanModel from '../models/plan.ts'
import DataAccess from './dataAccess.ts'

export default class PlansDataAccess extends DataAccess<IPlanModel> {
    constructor() {
        super('Plans')
    }
}