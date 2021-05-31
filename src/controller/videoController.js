const videoService = require('../service/videoService');
class VideoController {

  async videoView(req, res) {
    const ret = await videoService.videoView(req);
    res.json(ret);
    res.end();

  }

  async videoInsert(req, res) {
    const ret = await videoService.videoInsert(req.body);
    res.json(ret);
    res.end();
  }

  async videoUpdate(req, res) {

    const ret = await videoService.videoupdate(req.body);
    res.json(ret);
    res.end();

  }

  async videoDelete(req, res) {
    const ret = await videoService.videodelete(req.body);
    res.json(ret);
    res.end();

  }

}
const videoController = new VideoController();
module.exports = videoController;