const router = require('express').Router();
const ctrl = require('../controllers/reportController');
router.get('/completed',ctrl.completed);
router.get('/pending',ctrl.pending);
router.get('/summary',ctrl.summary);
module.exports = router;
