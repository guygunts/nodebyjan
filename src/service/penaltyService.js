const DBRepository = require('../repositories/DBRepository');

class PenaltyService {
    constructor() {
        this.DBRepository = new DBRepository();
    }
    async penaltyView(req){
        try {
            let resultJson

            let client = await this.DBRepository.executeQuery(`select id_penalty, description,DATE_FORMAT(CRATE_DATE, "%Y-%m-%d %T") CRATE_DATE, CREATE_BY,DATE_FORMAT(UPDATE_DATE, "%Y-%m-%d %T") UPDATE_DATE, UPDATE_BY from penalty`);

            
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

    async penaltyInsert(req,Base64) {
        try {
            await this.DBRepository.executeQuery(`INSERT INTO penalty
            (description,
            CREATE_BY,
            CRATE_DATE)
            VALUES
            (?,?,CURRENT_TIMESTAMP)`,[req.description,req.CREATE_BY]);

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

    async  penaltyupdate(req,Base64) {
        try {
            await this.DBRepository.executeQuery(`UPDATE penalty
            SET
            description = ?,
            UPDATE_BY = ?,
            UPDATE_DATE=CURRENT_TIMESTAMP
            WHERE id_penalty = ?`,[req.description,req.CREATE_BY,req.id_penalty]);

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

    async penaltydelete(req) {
        try {
             await this.DBRepository.executeQuery(`delete from penalty where id_penalty=?`,[req.id_penalty]);

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
const penaltyService = new PenaltyService();
module.exports = penaltyService;