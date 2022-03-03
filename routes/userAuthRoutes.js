const {Router} = require('express');
const userAuthController = require('../controller/userAuthController');

const router = Router();

router.get('/login', userAuthController.login_get);

router.post('/login', userAuthController.login_post);

router.get('/signup', userAuthController.signup_get);

router.post('/signup', userAuthController.signup_post);

router.get('/logout', userAuthController.logout_get);

router.get('/:email', userAuthController.profile_get);

router.get('/lesson', userAuthController.lesson_get);

module.exports = router;