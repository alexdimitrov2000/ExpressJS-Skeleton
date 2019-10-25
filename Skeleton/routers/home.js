const router = require('express').Router();
const controllers = require('../controllers');
const auth = require('../utilities/auth');

router.get('/', auth(false), controllers.home.get.index);

module.exports = router;