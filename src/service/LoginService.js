const DBRepository = require('../../src/repositories/DBRepository');
const e = require('express');

class LoginService {
    constructor() {
        this.DBRepository = new DBRepository();
    }

    async loginUsers(req) {
        let resultJson
        let client = await this.DBRepository.executeQuery("select * from login where USER_NAME='" + req.username + "'");
        if (client.length != 0) {
            let clientpass = await this.DBRepository.executeQuery("select USER_NAME, PASSWORD from login where USER_NAME='" + req.username + "' and PASSWORD ='" + req.password + "'");
            if (clientpass.length != 0) {
                resultJson = {
                    "code": '200',
                    "msg": 'success',
                    "user": client[0].USER_NAME,
                    "role":client[0].Role
                }
            } else {
                resultJson = {
                    "code": '500',
                    "msg": 'password is Wrong'
                }
            }
            return resultJson
        } else {
            resultJson = {
                "code": '500',
                "msg": 'Username is Wrong'
            }
            return resultJson
        }
    }

    async registerUser(req) {
        try {

            await this.DBRepository.executeQuery(`INSERT INTO login
            (USER_NAME,
             PASSWORD,
             CREATE_BY,
             CRATE_DATE,
             TEL,
             Address
             )
            VALUES
            (?,?,?,CURRENT_TIMESTAMP,?,?)`,[req.USER_NAME,req.PASSWORD,req.USER_NAME,req.TEL,req.Address])

            let resultJson = {
                "code": '200',
                "msg": 'success'
              }
              return resultJson
        } catch (error) {
            console.log(error)
            return error
        }

    }

}
const loginService = new LoginService();
module.exports = loginService;