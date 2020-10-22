const {Router} = require('express');
const router = Router();
const homeRoutes = require('./service');

router.get('/', homeRoutes.renderHome);

module.exports = router;
