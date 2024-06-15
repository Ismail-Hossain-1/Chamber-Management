const { Register, Login, Logout,  } = require('../controller/authController');

const router= require('express').Router();


router.post('/register',Register);
router.post('/login', Login);
router.post('/logout', Logout);


module.exports= router;