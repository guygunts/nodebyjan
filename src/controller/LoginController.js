const loginService =require('../service/LoginService');
class LoginController {
  async loginUser(req, res) {
    const ret = await loginService.loginUsers(req.body);
      res.json(ret);
      res.end();
  }

  async registerUser(req, res) {
    const ret = await loginService.registerUser(req.body);
      res.json(ret);
      res.end();
  }

 
}
const loginController = new LoginController();
module.exports= loginController;