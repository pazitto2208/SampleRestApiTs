import express from 'express'
import cors from 'cors'
import { ok } from '../helpers/jsonResponses.ts'
import usersRouter from '../routes/users.ts'
import authRouter from '../routes/auth.ts'
import coursesRouter from '../routes/courses.ts'
import plansRouter from '../routes/plans.ts'

export default function httpServer () {
    const hostname = 'localhost'
    const port = 3001

    const app = express()
    
    app.use(express.json())
    app.use(cors())

    app.get('/', (req, res) => {
        const result = ok<any>(undefined, 200, 'Wellcome to MyGym')
        res.status(result.statusCode).send(result)
    })

    // routes
    app.use('/users', usersRouter)
    app.use('/auth', authRouter)
    app.use('/courses', coursesRouter)
    app.use('/plans', plansRouter)
    
    app.listen(port, () => {
        console.log(`Server running on: http://${hostname}:${port}`)
    })
}