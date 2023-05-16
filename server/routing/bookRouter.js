const Router = require('express');
const router = new Router();
const bookController = require('../controllers/bookController');

router.post('/create', bookController.create)
router.get('/get_all', bookController.getAll)
router.get('/:id', bookController.getOne)
router.patch('/update/:id', bookController.update)
router.delete('/delete/:id', bookController.delete)

module.exports = router