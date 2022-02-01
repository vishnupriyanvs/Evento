const express = require('express');
const router = express.Router();

const departmentRoutes = require('./department.route');
const gradeRoutes = require('./grade.route');
const jobTitleRoutes = require('./jobTitle.route');
const locationRoutes = require('./location.route');
const roleRoutes = require('./role.route');
const userRoutes = require('./user.route');
// const userRoleRoutes = require('./userRole.route');

router.use('/departments',departmentRoutes);
router.use('/grades',gradeRoutes);
router.use('/jobTitles',jobTitleRoutes);
router.use('/locations',locationRoutes);
router.use('/roles',roleRoutes);
router.use('/users',userRoutes);
// router.use('/userroles',userRoleRoutes);


module.exports = router;