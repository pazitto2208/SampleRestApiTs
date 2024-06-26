import express from 'express'
import cors from 'cors'
import usersRouter from '../routes/users.ts'
import authRouter from '../routes/auth.ts'
import thermostatRouter from '../routes/thermostat.ts'

export default function httpServer () {
    const hostname = 'localhost'
    const port = 3001

    const app = express()
    
    app.use(express.json())
    app.use(cors())

    // routes
    app.use('/users', usersRouter)
    app.use('/auth', authRouter)
    app.use('/thermostat', thermostatRouter)
    
    app.listen(port, () => {
        console.log(`Server running on: http://${hostname}:${port}`)
    })
}