const DBRepository = require('../repositories/DBRepository');

class TrafficService {
    constructor() {
        this.DBRepository = new DBRepository();
    }
    async trafficView(req){
        try {
            let resultJson

            let client = await this.DBRepository.executeQuery(`select id_traffic, description, image,DATE_FORMAT(CRATE_DATE, "%Y-%m-%d %T") CRATE_DATE, CREATE_BY,DATE_FORMAT(UPDATE_DATE, "%Y-%m-%d %T") UPDATE_DATE, UPDATE_BY from traffic`);

            
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

    async trafficInsert(req,Base64) {
        try {

            const fs = require('fs');
            const contents = await  fs.readFileSync(Base64.path, {encoding: 'base64'})

            await this.DBRepository.executeQuery(`INSERT INTO traffic
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

    async  trafficupdate(req,Base64) {
        try {

            const fs = require('fs');
            const contents = await  fs.readFileSync(Base64.path, {encoding: 'base64'})

            await this.DBRepository.executeQuery(`UPDATE traffic
            SET
            description = ?,
            image = ?,
            UPDATE_BY = ?,
            UPDATE_DATE=CURRENT_TIMESTAMP
            WHERE id_traffic = ?`,[req.description,`data:${Base64.mimetype};base64,${contents}`,req.CREATE_BY,req.id_traffic]);

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

    async trafficdelete(req) {
        try {
             await this.DBRepository.executeQuery(`delete from traffic where id_traffic=?`,[req.id_traffic]);

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
const trafficService = new TrafficService();
module.exports = trafficService;