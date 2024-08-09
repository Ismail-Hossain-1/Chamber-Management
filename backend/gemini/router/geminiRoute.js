const { verifyDoctor } = require('../../middleware/jwtVerify');
const { ChatControll } = require('../controller/GeminiController');

const router= require('express').Router();

router.post('/chat', verifyDoctor, ChatControll);


module.exports= router;