const basicdriverService = require('../service/basicdriverService');
class BasicdriverController {

  async basicdriverView(req, res) {
    const ret = await basicdriverService.basicdriverView(req);
    res.json(ret);
    res.end();

  }

  async basicdriverInsert(req, res) {
    let multer = require('multer')
    let filessystem = require('fs');
    let dir = 'image/'
    let storage = multer.diskStorage({
      destination: (req, file, cb) => {
        if (!filessystem.existsSync(dir)) {
          filessystem.mkdirSync(dir);
        }
        cb(null, dir);
      },
      filename: (req, file, cb) => {

        cb(null, file.originalname)
      }
    });

    let upload = multer({ storage }).any()

    upload(req, res, async function (err) {
      for (let i = 0; i < req.files.length; i++) {
            basicdriverService.basicdriverInsert(req.body,req.files[i]);
      }
     
      let resultJson = {
        "code": '200',
        "msg": 'success'
      }
      res.json(resultJson);
      res.end();
    })
  }

  async basicdriverUpdate(req, res) {
    let multer = require('multer')
    let filessystem = require('fs');
    let dir = 'image/'
    let storage = multer.diskStorage({
      destination: (req, file, cb) => {

        if (!filessystem.existsSync(dir)) {
          filessystem.mkdirSync(dir);
        }
        cb(null, dir);
      },
      filename: (req, file, cb) => {

        cb(null, file.originalname)
      }
    });

    let upload = multer({ storage }).any()

    upload(req, res, async function (err) {

      for (let i = 0; i < req.files.length; i++) {
            basicdriverService.basicdriverupdate(req.body, req.files[i]);
      }

      let datafile= filessystem.readdirSync(dir)
      if(datafile.length>0){
        for(let i=0; i< datafile.length; i++){
          filessystem.unlinkSync(`image/${datafile[i]}`)
        }
      }
      let resultJson = {
        "code": '200',
        "msg": 'success'
      }
      res.json(resultJson);
      res.end();
    })
  }

  async basicdriverDelete(req, res) {
    const ret = await basicdriverService.basicdriverdelete(req.body);
    res.json(ret);
    res.end();

  }

}
const basicdriverController = new BasicdriverController();
module.exports = basicdriverController;