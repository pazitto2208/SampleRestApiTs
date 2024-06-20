import express from 'express'
import ICourseModel from '../models/course.ts'
import CoursesControllers from '../controllers/courses.ts'
import CoursesDataAccess from '../dataAccess/courses.ts'

const coursesRouter = express.Router()

const coursesDataAccess = new CoursesDataAccess()
const coursesControllers = new CoursesControllers(coursesDataAccess)

coursesRouter.get('/', async (req, res) => {
    const result = await coursesControllers.getAll()
    res.status(result.statusCode).send(result)
})

coursesRouter.get('/:id', async (req, res) => {
    const courseId: string = req.params.id

    const result = await coursesControllers.getById(courseId)
    res.status(result.statusCode).send(result)
})

coursesRouter.delete('/:id', async (req, res) => {
    const courseId: string = req.params.id

    const result = await coursesControllers.deleteById(courseId)
    res.status(result.statusCode).send(result)
})

coursesRouter.put('/:id', async (req, res) => {
    const courseId: string = req.params.id
    const courseData: Partial<ICourseModel> = req.body

    const result= await coursesControllers.updateById(courseId, courseData)
    
    res.status(result.statusCode).send(result)
})

export default coursesRouter 