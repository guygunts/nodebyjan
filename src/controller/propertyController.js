const propertyService = require('../service/propertyService');
class PropertyController {

  async propertyView(req, res) {
    const ret = await propertyService.propertyView(req);
    res.json(ret);
    res.end();

  }

  async propertyInsert(req, res) {
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
            propertyService.propertyInsert(req.body,req.files[i]);
      }
     
      let resultJson = {
        "code": '200',
        "msg": 'success'
      }
      res.json(resultJson);
      res.end();
    })
  }

  async propertyUpdate(req, res) {
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
            propertyService.propertyupdate(req.body, req.files[i]);
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

  async propertyDelete(req, res) {
    const ret = await propertyService.propertydelete(req.body);
    res.json(ret);
    res.end();

  }

}
const propertyController = new PropertyController();
module.exports = propertyController;