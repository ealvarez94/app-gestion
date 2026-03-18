import { Router } from 'express'
import { authenticateToken } from '../../middlewares/auth.middleware.js'
import { asyncHandler } from '../../shared/utils/async-handler.js'
import { login, verifyToken } from './auth.controller.js'

const router = Router()

router.post('/login', asyncHandler(login))
router.get('/verify', authenticateToken, verifyToken)

export default router
