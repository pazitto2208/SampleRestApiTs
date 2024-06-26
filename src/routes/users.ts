import express from 'express'
import UsersMsSqlRepository from '../repositories/msSql/users.ts'
import UsersControllers from '../controllers/users.ts'
import UsersDataAccess from '../dataAccess/users.ts'
import { MsSqlClient } from '../database/msSql.ts'
import { config } from 'dotenv'

config()

const usersRouter = express.Router()

const usersMsSqlRepository = new UsersMsSqlRepository(MsSqlClient.pool)
const usersDataAcces = new UsersDataAccess(usersMsSqlRepository)
const usersControllers = new UsersControllers(usersDataAcces)

usersRouter.get('/', async (req, res) => {
    const result = await usersControllers.getAll()

    res.status(result.statusCode).send(result)
})

usersRouter.get('/:username', async (req, res) => {
    const result = await usersControllers.getUserByUsername(req.params.username)

    res.status(result.statusCode).send(result)
})

usersRouter.get('/:id', async (req, res) => {
    const result = await usersControllers.getById(req.params.id)

    res.status(result.statusCode).send(result)
})

usersRouter.post('/', async (req, res) => {
    const result = await usersControllers.addOne(req.body)

    res.status(result.statusCode).send(result)
})

usersRouter.delete('/:id', async (req, res) => {
    const result = await usersControllers.deleteById(req.params.id)

    res.status(result.statusCode).send(result)
})

export default usersRouter 