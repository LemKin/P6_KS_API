const express = require('express');
const router = express.Router();
const multerMiddleware = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauces');

router.get('/', saucesCtrl.getAllSauces);
router.get('/:id', saucesCtrl.getSauce);
router.post('/', multerMiddleware, saucesCtrl.postSauce);
router.put('/:id', saucesCtrl.putSauce);
router.delete('/:id', saucesCtrl.deleteSauce);
router.post('/:id/like', saucesCtrl.postLikeSauce);

module.exports = router;