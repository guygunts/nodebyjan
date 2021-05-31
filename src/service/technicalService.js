const DBRepository = require('../repositories/DBRepository');

class TechnicalService {
    constructor() {
        this.DBRepository = new DBRepository();
    }
    async technicalView(req){
        try {
            let resultJson

            let client = await this.DBRepository.executeQuery(`select id_technical, description, image,DATE_FORMAT(CRATE_DATE, "%Y-%m-%d %T") CRATE_DATE, CREATE_BY,DATE_FORMAT(UPDATE_DATE, "%Y-%m-%d %T") UPDATE_DATE, UPDATE_BY from technical`);

            
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

    async technicalInsert(req,Base64) {
        try {

            const fs = require('fs');
            const contents = await  fs.readFileSync(Base64.path, {encoding: 'base64'})

            await this.DBRepository.executeQuery(`INSERT INTO technical
            (description,
            image,
            CREATE_BY,
            CRATE_DATE)
            VALUES
            (?,?,?,CURRENT_TIMESTAMP)`,[req.description,`data:${Base64.mimetype};base64,${contents}`,req.CREATE_BY]);

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

    async  technicalupdate(req,Base64) {
        try {

            const fs = require('fs');
            const contents = await  fs.readFileSync(Base64.path, {encoding: 'base64'})

            await this.DBRepository.executeQuery(`UPDATE technical
            SET
            description = ?,
            image = ?,
            UPDATE_BY = ?,
            UPDATE_DATE=CURRENT_TIMESTAMP
            WHERE id_technical = ?`,[req.description,`data:${Base64.mimetype};base64,${contents}`,req.UPDATE_BY,req.id_technical]);

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

    async technicaldelete(req) {
        try {
             await this.DBRepository.executeQuery(`delete from technical where id_technical=?`,[req.id_technical]);

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
const technicalService = new TechnicalService();
module.exports = technicalService;