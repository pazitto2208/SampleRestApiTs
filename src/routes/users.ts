import express from 'express'
import IUserModel from '../models/user.ts'
import UsersControllers from '../controllers/users.ts'
import UsersDataAcces from '../dataAccess/users.ts'

const usersRouter = express.Router()

const usersDataAccess = new UsersDataAcces()
const usersControllers = new UsersControllers(usersDataAccess)

usersRouter.get('/', async (req, res) => {
    const result = await usersControllers.getAll()
    res.status(result.statusCode).send(result)
})

usersRouter.delete('/:id', async (req, res) => {
    const result = await usersControllers.deleteById(req.params.id)
    res.status(result.statusCode).send(result)
})

usersRouter.put('/:id', async (req, res) => {
    const userId: string = req.params.id
    const userData: Partial<IUserModel> = req.body

    const result = await usersControllers.updateUser(userId, userData)
    res.status(result.statusCode).send(result)
})

export default usersRouter 