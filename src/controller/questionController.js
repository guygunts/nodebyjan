const questionService = require('../service/questionService');
class QuestionController {

  async questionView(req, res) {
    const ret = await questionService.questionView(req);
    res.json(ret);
    res.end();

  }

  async questionInsert(req, res) {
    const ret = await questionService.questionInsert(req.body);
    res.json(ret);
    res.end();
  }

  async questionUpdate(req, res) {

    const ret = await questionService.questionupdate(req.body);
    res.json(ret);
    res.end();

  }

  async questionDelete(req, res) {
    const ret = await questionService.questiondelete(req.body);
    res.json(ret);
    res.end();

  }

}
const questionController = new QuestionController();
module.exports = questionController;