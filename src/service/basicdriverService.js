const DBRepository = require('../repositories/DBRepository');

class BasicdriverService {
    constructor() {
        this.DBRepository = new DBRepository();
    }
    async basicdriverView(req){
        try {
            let resultJson

            let client = await this.DBRepository.executeQuery(`select id_basic_driver, description,type_car, image,DATE_FORMAT(CRATE_DATE, "%Y-%m-%d %T") CRATE_DATE, CREATE_BY,DATE_FORMAT(UPDATE_DATE, "%Y-%m-%d %T") UPDATE_DATE, UPDATE_BY from basic_driver`);

            
            resultJson = {
                "code": '200',
                "msg": 'success',
                "data": client
            }
            return resultJson
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async basicdriverInsert(req,Base64) {
        try {

            const fs = require('fs');
            const contents = await  fs.readFileSync(Base64.path, {encoding: 'base64'})

            await this.DBRepository.executeQuery(`INSERT INTO basic_driver
            (description,
            image,
            type_car,
            CREATE_BY,
            CRATE_DATE)
            VALUES
            (?,?,?,?,CURRENT_TIMESTAMP)`,[req.description,`data:${Base64.mimetype};base64,${contents}`,req.type_car,req.CREATE_BY]);

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

    async  basicdriverupdate(req,Base64) {
        try {

            const fs = require('fs');
            const contents = await  fs.readFileSync(Base64.path, {encoding: 'base64'})

            await this.DBRepository.executeQuery(`UPDATE basic_driver
            SET
            description = ?,
            image = ?,
            type_car= ?,
            UPDATE_BY = ?,
            UPDATE_DATE=CURRENT_TIMESTAMP
            WHERE id_basic_driver = ?`,[req.description,`data:${Base64.mimetype};base64,${contents}`,req.type_car,req.CREATE_BY,req.id_basic_driver]);

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

    async basicdriverdelete(req) {
        try {
             await this.DBRepository.executeQuery(`delete from basic_driver where id_basic_driver=?`,[req.id_basic_driver]);

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
const basicdriverService = new BasicdriverService();
module.exports = basicdriverService;