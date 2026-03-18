import { Router } from 'express'
import { authenticateToken } from '../../middlewares/auth.middleware.js'
import { asyncHandler } from '../../shared/utils/async-handler.js'
import { getMonthlyStatistics } from './estadisticas.controller.js'

const router = Router()

router.use(authenticateToken)
router.get('/mes', asyncHandler(getMonthlyStatistics))

export default router
