const technicalService = require('../service/technicalService');
class TechnicalController {

  async technicalView(req, res) {
    const ret = await technicalService.technicalView(req);
    res.json(ret);
    res.end();

  }

  async technicalInsert(req, res) {
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
            technicalService.technicalInsert(req.body,req.files[i]);
      }
     
      let resultJson = {
        "code": '200',
        "msg": 'success'
      }
      res.json(resultJson);
      res.end();
    })
  }

  async technicalUpdate(req, res) {
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
            technicalService.technicalupdate(req.body, req.files[i]);
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

  async technicalDelete(req, res) {
    const ret = await technicalService.technicaldelete(req.body);
    res.json(ret);
    res.end();

  }

}
const technicalController = new TechnicalController();
module.exports = technicalController;