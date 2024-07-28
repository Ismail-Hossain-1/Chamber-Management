const { AppointmentsToday, PatientsRange, PatTodo, AppTodo, GetAppTodo, GetAPatTodo } = require('../controller/homeController');
const { verifyDoctor } = require('../middleware/jwtVerify');

const router= require('express').Router();

router.get('/appointmentstoday', verifyDoctor, AppointmentsToday);
router.get('/patientsrange', verifyDoctor, PatientsRange);
router.post('/apptodo', verifyDoctor, AppTodo)
router.get('/apptodo', verifyDoctor, GetAppTodo)
router.post('/pattodo', verifyDoctor, PatTodo)
router.get('/pattodo', verifyDoctor, GetAPatTodo)



module.exports= router;