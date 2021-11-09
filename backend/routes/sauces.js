const express = require('express');
const router = express.Router();

const auth = require('../config/auth');
const multerMiddleware = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauces');

router.post('/', auth, multerMiddleware, saucesCtrl.postSauce);
router.put('/:id', auth, multerMiddleware, saucesCtrl.putSauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauce);
router.post('/:id/like', auth, saucesCtrl.postLikeSauce);

module.exports = router;