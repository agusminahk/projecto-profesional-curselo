const router = require('express').Router();

const authRouter = require('./auth');
const clientRoutes = require('./client');
const superAdminRoutes = require('./superAdmin');
const adminRoutes = require('./admin');
const staffRoutes = require('./staff');

// Client
router.use('/client', clientRoutes);

// Super Admin
router.use('/superAdmin', superAdminRoutes);

// Admin
router.use('/admin', adminRoutes);

// Staff
router.use('/staff', staffRoutes);

router.use('/auth', authRouter);

module.exports = router;
