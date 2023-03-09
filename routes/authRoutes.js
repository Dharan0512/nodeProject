const express = require('express');
const router = express.Router()

const {register, login} = require('../controllers/authControllers')
const {personalDetails, createPersonalDetails} = require('../controllers/personalControllers');

router.route('/register').post(register)
router.route('/login').post(login)


router.route('/personalDetails').get(personalDetails).post(createPersonalDetails)
module.exports = router