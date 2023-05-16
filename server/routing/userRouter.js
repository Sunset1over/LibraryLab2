const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/reg', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.patch('/update/:id', userController.update)
router.delete('/delete/:id', userController.delete)

module.exports = router