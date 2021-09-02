const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const thoughtRoutes = require ('./thought-routes.js');

router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

module.exports = router;