const DBRepository = require('../repositories/DBRepository');

class TypedriverlicenseService {
    constructor() {
        this.DBRepository = new DBRepository();
    }
    async typedriverlicenseView(req){
        try {
            let resultJson

            let client = await this.DBRepository.executeQuery(`select id_type_driver_license, description,DATE_FORMAT(CRATE_DATE, "%Y-%m-%d %T") CRATE_DATE, CREATE_BY,DATE_FORMAT(UPDATE_DATE, "%Y-%m-%d %T") UPDATE_DATE, UPDATE_BY from type_driver_license`);

            
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

    async typedriverlicenseInsert(req,Base64) {
        try {

          
            await this.DBRepository.executeQuery(`INSERT INTO type_driver_license
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

    async  typedriverlicenseupdate(req,Base64) {
        try {
            await this.DBRepository.executeQuery(`UPDATE type_driver_license
            SET
            description = ?,
            UPDATE_BY = ?,
            UPDATE_DATE=CURRENT_TIMESTAMP
            WHERE id_type_driver_license = ?`,[req.description,req.CREATE_BY,req.id_type_driver_license]);

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

    async typedriverlicensedelete(req) {
        try {
             await this.DBRepository.executeQuery(`delete from type_driver_license where id_type_driver_license=?`,[req.id_type_driver_license]);

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
const typedriverlicenseService = new TypedriverlicenseService();
module.exports = typedriverlicenseService;