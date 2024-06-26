import express from 'express'
import UsersMsSqlRepository from '../repositories/msSql/users.ts'
import UsersDataAccess from '../dataAccess/users.ts'
import { MsSqlClient } from '../database/msSql.ts'
import { config } from 'dotenv'
import AuthControllers from '../controllers/auth.ts'

config()

const authRouter = express.Router()

const usersMsSqlRepository = new UsersMsSqlRepository(MsSqlClient.pool)
const usersDataAcces = new UsersDataAccess(usersMsSqlRepository)
const authControllers = new AuthControllers(usersDataAcces)

authRouter.post('/login', async (req, res) => {
    const result = await authControllers.login(req.body)

    res.status(result.statusCode).send(result)
})

authRouter.post('/signup', async (req, res) => {
    const result = await authControllers.signup(req.body)

    res.status(result.statusCode).send(result)
})

export default authRouter 