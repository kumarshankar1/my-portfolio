const ApiController = require('../controllers/ApiController');
const router = require('express').Router();

router.get("/get-aboutInfo/:id",ApiController.getAbout);
router.get("/get-homeInfo/:id",ApiController.getHomeInfo);
router.get("/get-AllProjectInfo",ApiController.getAllProject);
router.get("/get-contactInfo/:id",ApiController.getContact);
router.post("/contact-us",ApiController.addQuery);

module.exports = router 