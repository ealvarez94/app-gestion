import { loginUser } from './auth.service.js'

export const login = async (req, res) => {
  const result = await loginUser(req.body)
  res.json(result)
}

export const verifyToken = (req, res) => {
  res.json({
    valid: true,
    user: req.user,
    mensaje: 'Token válido'
  })
}
