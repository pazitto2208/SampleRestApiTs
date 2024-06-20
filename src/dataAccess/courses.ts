import ICourseModel from "../models/course.ts"
import DataAccess from "./dataAccess.ts"

export default class CoursesDataAccess extends DataAccess<ICourseModel>   {
    constructor() {
        super('Courses')
    }
}