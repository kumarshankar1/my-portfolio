const adminController = require('../controllers/adminController');
const aboutCtrl = require('../controllers/aboutController');
const homeCtrl = require('../controllers/homeController');
const projectCtrl = require('../controllers/projectController');
const router = require('express').Router();

// router.get('/', adminController.adminLogin) 
router.post('/login', adminController.login)
router.get('/dashboard', adminController.adminDashboard) 
router.get('/logout', adminController.adminLogout)
router.get('/aboutme', aboutCtrl.aboutme)
router.post('/update-aboutme', aboutCtrl.updateAboutMe)
router.get('/homeInfo', homeCtrl.homeInfo)
router.post('/update-homeInfo', homeCtrl.updateHomeInfo)

router.get('/get-projects', projectCtrl.getProject);
router.get('/add-project', projectCtrl.addProject); 
router.post('/create-project', projectCtrl.createProject);
router.get('/edit-project', projectCtrl.editProject);
router.post('/update-project', projectCtrl.updateProject); 
router.post('/delete-project', projectCtrl.deleteData);
router.post('/project-status-update', projectCtrl.updateStatusData); 

router.get('/all-enquiry', adminController.contactList);
router.post('/delete-enquiry', adminController.deleteContact);
 
module.exports = router