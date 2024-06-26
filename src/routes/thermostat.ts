import express from 'express'
import ThermostatControllers from '../controllers/thermostat.ts'
import ThermostatDataAccess from '../dataAccess/thermostat.ts'
import { MsSqlClient } from '../database/msSql.ts'
import { config } from 'dotenv'
import ThermostatMsSqlRepository from '../repositories/msSql/thermostat.ts'

config()

const thermostatRouter = express.Router()

const thermostatMsSqlRepository = new ThermostatMsSqlRepository(MsSqlClient.pool)
const thermostatDataAcces = new ThermostatDataAccess(thermostatMsSqlRepository)
const thermostatControllers = new ThermostatControllers(thermostatDataAcces)

thermostatRouter.get('/', async (req, res) => {
    const result = await thermostatControllers.getAll()

    res.status(result.statusCode).send(result)
})

thermostatRouter.get('/:id', async (req, res) => {
    const result = await thermostatControllers.getById(req.params.id)

    res.status(result.statusCode).send(result)
})

thermostatRouter.delete('/:id', async (req, res) => {
    const result = await thermostatControllers.deleteById(req.params.id)

    res.status(result.statusCode).send(result)
})

export default thermostatRouter 