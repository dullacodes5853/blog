const router = require('express').Router();

const AllDashboardRoutes = require('./routes-of-dashboard.js');
const AllHomeRoutes = require('./routes-of-home');
const AllapiRoutes = require("./api")

router.use('/', AllHomeRoutes);
router.use('/dashboard', AllDashboardRoutes);
router.use('/api', AllapiRoutes);

module.exports = router;