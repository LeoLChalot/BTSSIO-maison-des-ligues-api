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

// ? Get All
router.get('/users/all', adminController.getAllUsers);
router.get('/commandes/all', adminController.getAllCommandes);


// ? Get One by id
router.get('/commande/:id', adminController.getCommandeById);


// ? Create
router.post('/categorie/new', adminController.createCategory);
router.post('/article/new', upload.single('photo'), adminController.createArticle);


// ? Update role
router.put('/user/role/:id', adminController.updatePrivilege);
router.put('/categorie/:id', adminController.updateCategory);
router.put('/article/:id', upload.single('photo'), adminController.updateArticle);


// ? Delete
router.delete('/categorie/:id', adminController.deleteCategory);
router.delete('/article/:id', adminController.deleteArticle);

// TODO
router.delete('/user/:id', adminController.deleteUser); 



module.exports = router
