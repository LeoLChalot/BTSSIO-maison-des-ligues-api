const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

// const cookieAdmin = require('../middleware/verifAdmin');
const bearerAdmin = require('../middleware/verifAdmin');

const MIME_TYPES = {
   'image/jpg': 'jpg',
   'image/jpeg': 'jpg',
   'image/png': 'png',
};

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'images');
   },
   filename: function (req, file, cb) {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      cb(null, name + Date.now() + '.' + extension);
   },
});
const upload = multer({ storage: storage });
const adminController = require('../controller/adminController');

// router.use(cookieAdmin)
router.use(bearerAdmin)
router.get('/users/all', adminController.getAllUsers);
router.post('/categorie/new', adminController.createCategory);
router.delete('/categorie/:id', adminController.deleteCategory);
router.put('/categorie/:id', adminController.updateCategory);
router.post('/article', upload.single('photo'), adminController.createArticle);
router.put('/article', upload.single('photo'), adminController.updateArticle);
router.delete('/article/:id', adminController.deleteArticle);

module.exports = router
