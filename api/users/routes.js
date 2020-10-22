const {Router} = require('express');
const router = Router();
const user = require('./service');

// Hacer render de registro de usuario y registrar usuario
router.get('/signup', user.renderSignUpForm);
router.post('/signup', user.signup);

// hacer render de login y validar en bd
// router.get('/login', user.renderSignInForm);
// router.post('/login', user.signin);

// Logout
// router.get('/logout', user.logout);

module.exports = router;
