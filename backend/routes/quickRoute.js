const { AppointmentsToday, PatientsRange } = require('../controller/homeController');
const { verifyDoctor } = require('../middleware/jwtVerify');

const router= require('express').Router();

router.get('/appointmentstoday', verifyDoctor, AppointmentsToday);
router.get('/patientsrange', verifyDoctor, PatientsRange);


module.exports= router;