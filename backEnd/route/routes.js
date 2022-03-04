const express = require('express');
const router = express.Router();

const departmentRoutes = require('./department.route');
const gradeRoutes = require('./grade.route');
const jobTitleRoutes = require('./jobTitle.route');
const locationRoutes = require('./location.route');
const roleRoutes = require('./role.route');
const userRoutes = require('./user.route');
const eventRoutes = require('./event.route');
const invitationRoutes = require('./invitation.route');
const eventFeedbackRoutes = require('./eventFeedback.route')
const eventImages = require('./images.route')
const msalRoutes = require('./msal.route')

router.use('/departments',departmentRoutes);
router.use('/grades',gradeRoutes);
router.use('/jobTitles',jobTitleRoutes);
router.use('/locations',locationRoutes);
router.use('/roles',roleRoutes);
router.use('/users',userRoutes);
router.use('/events',eventRoutes);
router.use('/invitations',invitationRoutes);
router.use('/feedbacks',eventFeedbackRoutes);
router.use('/images', eventImages);
router.use('/microsoft-login',msalRoutes);



module.exports = router;