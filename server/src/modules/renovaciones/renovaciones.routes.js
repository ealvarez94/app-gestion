import { Router } from 'express'
import { authenticateToken } from '../../middlewares/auth.middleware.js'
import { asyncHandler } from '../../shared/utils/async-handler.js'
import {
  applyRenovacionesIpc,
  createRenovacion,
  deleteRenovacion,
  getRenovacion,
  listRenovaciones,
  updateRenovacion
} from './renovaciones.controller.js'

const router = Router()

router.use(authenticateToken)

router.get('/', asyncHandler(listRenovaciones))
router.get('/:id', asyncHandler(getRenovacion))
router.post('/', asyncHandler(createRenovacion))
router.put('/:id', asyncHandler(updateRenovacion))
router.delete('/:id', asyncHandler(deleteRenovacion))
router.post('/aplicar-ipc', asyncHandler(applyRenovacionesIpc))

export default router
