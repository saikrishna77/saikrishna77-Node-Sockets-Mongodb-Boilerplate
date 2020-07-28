const router = require('express').Router();
const BasicController = require('../Controllers/BasicController');

router.get('/', BasicController.basicRoute);
module.exports = router;
