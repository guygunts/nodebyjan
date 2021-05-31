var express = require('express');
const router = express.Router();
const login =require('../src/controller/LoginController')
const basicdriver =require('../src/controller/basicdriverController')
const property =require('../src/controller/propertyController')
const traffic =require('../src/controller/trafficController')
const technical =require('../src/controller/technicalController')
const question =require('../src/controller/questionController')
const penalty=require('../src/controller/penaltyController')
const typedriverlicense =require('../src/controller/typedriverlicenseController')
const exam =require('../src/controller/examController')
const video =require('../src/controller/videoController')


router.post('/ionic/login',login.loginUser)
router.post('/ionic/register',login.registerUser)

router.get('/ionic/basicdrivergetView',basicdriver.basicdriverView)
router.post('/ionic/basicdrivergetinsert',basicdriver.basicdriverInsert)
router.post('/ionic/basicdrivergetupdate',basicdriver.basicdriverUpdate)
router.post('/ionic/basicdrivergetdelete',basicdriver.basicdriverDelete)

router.get('/ionic/propertygetView',property.propertyView)
router.post('/ionic/propertygetinsert',property.propertyInsert)
router.post('/ionic/propertygetupdate',property.propertyUpdate)
router.post('/ionic/propertygetdelete',property.propertyDelete)

router.get('/ionic/trafficgetView',traffic.trafficView)
router.post('/ionic/trafficgetinsert',traffic.trafficInsert)
router.post('/ionic/trafficgetupdate',traffic.trafficUpdate)
router.post('/ionic/trafficgetdelete',traffic.trafficDelete)

router.get('/ionic/technicalgetView',technical.technicalView)
router.post('/ionic/technicalgetinsert',technical.technicalInsert)
router.post('/ionic/technicalgetupdate',technical.technicalUpdate)
router.post('/ionic/technicalgetdelete',technical.technicalDelete)

router.get('/ionic/questiongetView',question.questionView)
router.post('/ionic/questiongetinsert',question.questionInsert)
router.post('/ionic/questiongetupdate',question.questionUpdate)
router.post('/ionic/questiongetdelete',question.questionDelete)

router.get('/ionic/penaltygetView',penalty.penaltyView)
router.post('/ionic/penaltygetinsert',penalty.penaltyInsert)
router.post('/ionic/penaltygetupdate',penalty.penaltyUpdate)
router.post('/ionic/penaltygetdelete',penalty.penaltyDelete)

router.get('/ionic/typedriverlicensegetView',typedriverlicense.typedriverlicenseView)
router.post('/ionic/typedriverlicensegetinsert',typedriverlicense.typedriverlicenseInsert)
router.post('/ionic/typedriverlicensegetupdate',typedriverlicense.typedriverlicenseUpdate)
router.post('/ionic/typedriverlicensegetdelete',typedriverlicense.typedriverlicenseDelete)

router.get('/ionic/examgetView',exam.examView)
router.post('/ionic/examgetinsert',exam.examInsert)
router.post('/ionic/examgetupdate',exam.examUpdate)
router.post('/ionic/examgetdelete',exam.examDelete)

router.get('/ionic/videoetView',video.videoView)
router.post('/ionic/videogetinsert',video.videoInsert)
router.post('/ionic/videogetupdate',video.videoUpdate)
router.post('/ionic/videogetdelete',video.videoDelete)

module.exports = router;
