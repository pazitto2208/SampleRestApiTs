import { IDataAccess } from "../dataAccess/iDataAccess.ts";
import ICourseModel from "../models/course.ts"
import Controllers from "./controllers.ts"

export default class CoursesControllers extends Controllers<ICourseModel> {
    constructor(dataAccess: IDataAccess<ICourseModel>) {
        super(dataAccess)
    }
}