import express from 'express'
import AuthControllers from '../controllers/auth.js'
import UsersDataAcces from '../dataAccess/users.ts'

const authRouter = express.Router()

const usersDataAccess = new UsersDataAcces()
const authControllers = new AuthControllers(usersDataAccess)

authRouter.post('/login', async (req, res) => {
    const result  = await authControllers.login(req.body)

    res.status(result.statusCode).send(result)
})

authRouter.post('/signup', async (req, res) => {
    const result = await authControllers.signup(req.body)

    res.status(result.statusCode).send(result)
})

export default authRouter 