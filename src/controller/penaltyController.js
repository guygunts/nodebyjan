const penaltyService = require('../service/penaltyService');
class PenaltyController {

  async penaltyView(req, res) {
    const ret = await penaltyService.penaltyView(req);
    res.json(ret);
    res.end();

  }

  async penaltyInsert(req, res) {
    const ret = await penaltyService.penaltyInsert(req.body);
    res.json(ret);
    res.end();

  }

  async penaltyUpdate(req, res) {


    const ret = await penaltyService.penaltyupdate(req.body);
    res.json(ret);
    res.end();

  }

  async penaltyDelete(req, res) {
    const ret = await penaltyService.penaltydelete(req.body);
    res.json(ret);
    res.end();

  }

}
const penaltyController = new PenaltyController();
module.exports = penaltyController;