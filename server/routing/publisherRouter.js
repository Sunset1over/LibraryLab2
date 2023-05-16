const Router = require('express');
const router = new Router();
const publisherController = require('../controllers/publisherController');

router.post('/create', publisherController.create)
router.get('/get_all', publisherController.getAll)
router.get('/get_one/:id', publisherController.getOne)
router.patch('/update/:id', publisherController.update)
router.delete('/delete/:id', publisherController.delete)

module.exports = router
