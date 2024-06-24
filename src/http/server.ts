import express from 'express'
import cors from 'cors'
import usersRouter from '../routes/users.ts'

export default function httpServer () {
    const hostname = 'localhost'
    const port = 3001

    const app = express()
    
    app.use(express.json())
    app.use(cors())

    // routes
    app.use('/users', usersRouter)
    
    app.listen(port, () => {
        console.log(`Server running on: http://${hostname}:${port}`)
    })
}