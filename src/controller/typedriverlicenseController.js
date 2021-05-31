const typedriverlicenseService = require('../service/typedriverlicenseService');
class TypedriverlicenseController {

  async typedriverlicenseView(req, res) {
    const ret = await typedriverlicenseService.typedriverlicenseView(req);
    res.json(ret);
    res.end();

  }

  async typedriverlicenseInsert(req, res) {

    const ret = await typedriverlicenseService.typedriverlicenseInsert(req.body);
    res.json(ret);
    res.end();

  }

  async typedriverlicenseUpdate(req, res) {

    const ret = await typedriverlicenseService.typedriverlicenseupdate(req.body);
    res.json(ret);
    res.end();

  }

  async typedriverlicenseDelete(req, res) {
    const ret = await typedriverlicenseService.typedriverlicensedelete(req.body);
    res.json(ret);
    res.end();

  }

}
const typedriverlicenseController = new TypedriverlicenseController();
module.exports = typedriverlicenseController;