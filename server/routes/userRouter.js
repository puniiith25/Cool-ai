import express from 'express'
import { getPublishShedCreation, getUserCreation, toggleLikeCreation } from '../Controllers/userController.js'
import { auth } from '../middlewares/auth.js'

const UserRouter = express.Router()

UserRouter.get('/get-user-creation', auth, getUserCreation)
UserRouter.get('/get-published-creation', auth, getPublishShedCreation)
UserRouter.post('/toggle-like-creation', auth, toggleLikeCreation)

export default UserRouter