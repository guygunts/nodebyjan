const trafficService = require('../service/trafficService');
class TrafficController {

  async trafficView(req, res) {
    const ret = await trafficService.trafficView(req);
    res.json(ret);
    res.end();

  }

  async trafficInsert(req, res) {
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
            trafficService.trafficInsert(req.body,req.files[i]);
      }
     
      let resultJson = {
        "code": '200',
        "msg": 'success'
      }
      res.json(resultJson);
      res.end();
    })
  }

  async trafficUpdate(req, res) {
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
            trafficService.trafficupdate(req.body, req.files[i]);
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

  async trafficDelete(req, res) {
    const ret = await trafficService.trafficdelete(req.body);
    res.json(ret);
    res.end();

  }

}
const trafficController = new TrafficController();
module.exports = trafficController;