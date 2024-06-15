const { AddPatient, AddAppoinment, MakePrescription, AllAppoinments, AllPatients } = require('../controller/doctorController');
const { verifyUser, verifyDoctor } = require('../middleware/jwtVerify');

const router= require('express').Router();

router.post('/addpatient', verifyDoctor, AddPatient);
router.post('/addappoinment', verifyDoctor, AddAppoinment);
router.post('/makeprescription', verifyDoctor, MakePrescription);
router.get('/allappoinements', verifyDoctor, AllAppoinments);
router.get('/allpatients', verifyDoctor, AllPatients);

module.exports= router;