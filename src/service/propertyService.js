const DBRepository = require('../repositories/DBRepository');

class PropertyService {
    constructor() {
        this.DBRepository = new DBRepository();
    }
    async propertyView(req){
        try {
            let resultJson

            let client = await this.DBRepository.executeQuery(`select id_property, description, image,DATE_FORMAT(CRATE_DATE, "%Y-%m-%d %T") CRATE_DATE, CREATE_BY,DATE_FORMAT(UPDATE_DATE, "%Y-%m-%d %T") UPDATE_DATE, UPDATE_BY from property`);

            
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

    async propertyInsert(req,Base64) {
        try {

            const fs = require('fs');
            const contents = await  fs.readFileSync(Base64.path, {encoding: 'base64'})

            await this.DBRepository.executeQuery(`INSERT INTO property
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

    async  propertyupdate(req,Base64) {
        try {

            const fs = require('fs');
            const contents = await  fs.readFileSync(Base64.path, {encoding: 'base64'})

            await this.DBRepository.executeQuery(`UPDATE property
            SET
            description = ?,
            image = ?,
            UPDATE_BY = ?,
            UPDATE_DATE=CURRENT_TIMESTAMP
            WHERE id_property = ?`,[req.description,`data:${Base64.mimetype};base64,${contents}`,req.CREATE_BY,req.id_property]);

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

    async propertydelete(req) {
        try {
             await this.DBRepository.executeQuery(`delete from property where id_property=?`,[req.id_property]);

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
const propertyService = new PropertyService();
module.exports = propertyService;