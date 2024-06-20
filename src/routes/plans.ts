import express from 'express'
import PlansControllers from '../controllers/plans.ts'
import IPlanModel from '../models/plan.ts'
import PlansDataAccess from '../dataAccess/plans.ts'

const plansRouter = express.Router()

const plansDataAccess = new PlansDataAccess()
const plansControllers = new PlansControllers(plansDataAccess)

plansRouter.get('/', async (req, res) => {
    const result = await plansControllers.getAll()
    res.status(result.statusCode).send(result)
})

plansRouter.get('/:id', async (req, res) => {
    const planId: string = req.params.id

    const result = await plansControllers.getById(planId)
    res.status(result.statusCode).send(result)
})

plansRouter.delete('/:id', async (req, res) => {
    const planId: string = req.params.id

    const result = await plansControllers.deleteById(planId)
    res.status(result.statusCode).send(result)
})

plansRouter.put('/:id', async (req, res) => {
    const planId: string = req.params.id
    const planData: Partial<IPlanModel> = req.body

    const result = await plansControllers.updateById(planId, planData)
    res.status(result.statusCode).send(result)
})

export default plansRouter 