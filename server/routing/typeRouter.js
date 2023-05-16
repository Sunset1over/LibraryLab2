const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');

router.post('/create', typeController.create)
router.get('/get_all', typeController.getAll)
router.get('/get_one/:id', typeController.getOne)
router.patch('/update/:id', typeController.update)
router.delete('/delete/:id', typeController.delete)

module.exports = router