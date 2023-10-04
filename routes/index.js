const express = require('express');
const router = express.Router();
const {registerController,loginController,userController,refreshController,productController} = require('../controllers'); 
const auth  = require('../middleware/auth');


router.post('/register',registerController.register)
router.post('/login',loginController.login)
// pass auth token in header
router.get('/me',auth,userController.me)
router.post('/refresh',refreshController.refresh)
router.post('/logout',auth,loginController.logout)


// products routes
router.post('/products',productController.store)
module.exports = router
