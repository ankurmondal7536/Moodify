const { Router } = require('express');
const authController = require('../controller/authController');
const authMiddleware = require('../middlewares/auth.Middleware');

const authRouter = Router();

authRouter.post('/register', authController.registerUser);
authRouter.post('/login', authController.loginUser);
authRouter.get("/get-me", authMiddleware.authUser ,authController.getMe)
authRouter.get("/logout",authMiddleware.authUser, authController.logoutUser)

module.exports = authRouter;