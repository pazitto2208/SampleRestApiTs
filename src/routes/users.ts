import express from 'express'
import UsersMsSqlRepository from '../repositories/msSql/users.ts'
import { MsSqlClient } from '../database/msSql.ts'
import UsersControllers from '../controllers/users.ts'
import UsersDataAccess from '../dataAccess/users.ts'

const usersRouter = express.Router()

const usersMsSqlRepository = new UsersMsSqlRepository(MsSqlClient)
const usersDataAcces = new UsersDataAccess(usersMsSqlRepository)
const usersControllers = new UsersControllers(usersDataAcces)

usersRouter.get('/', async (req, res) => {
    const result = await usersControllers.getAll()
    // res.status(result.statusCode).send(result)
})

usersRouter.post('/', async (req, res) => {
    const result = await usersControllers.addOne(req.body)
    // res.status(result.statusCode).send(result)
})

export default usersRouter 