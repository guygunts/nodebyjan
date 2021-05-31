const examService = require('../service/examService');
class ExamController {

  async examView(req, res) {
    const ret = await examService.examView(req);
    res.json(ret);
    res.end();

  }

  async examInsert(req, res) {
    const ret = await examService.examInsert(req.body);
    res.json(ret);
    res.end();
  }

  async examUpdate(req, res) {

    const ret = await examService.examupdate(req.body);
    res.json(ret);
    res.end();

  }

  async examDelete(req, res) {
    const ret = await examService.examdelete(req.body);
    res.json(ret);
    res.end();

  }

}
const examController = new ExamController();
module.exports = examController;