const DBRepository = require('../repositories/DBRepository');

class VideoService {
    constructor() {
        this.DBRepository = new DBRepository();
    }
    async videoView(req){
        try {
            let resultJson

            let client = await this.DBRepository.executeQuery(`select id_video,description,url,type_car,DATE_FORMAT(CRATE_DATE, "%Y-%m-%d %T") CRATE_DATE, CREATE_BY,DATE_FORMAT(UPDATE_DATE, "%Y-%m-%d %T") UPDATE_DATE, UPDATE_BY from video`);

            
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

    async videoInsert(req) {
        try {

            await this.DBRepository.executeQuery(`INSERT INTO video
            (description,
            url,
            type_car,
            CREATE_BY,
            CRATE_DATE)
            VALUES
            (?,?,?,CURRENT_TIMESTAMP)`,[req.description,req.url,req.type_car,req.CREATE_BY]);

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

    async  videoupdate(req,Base64) {
        try {

            await this.DBRepository.executeQuery(`UPDATE video
            SET
            description = ?,
            url = ?,
            type_car = ?,
            UPDATE_BY = ?,
            UPDATE_DATE=CURRENT_TIMESTAMP
            WHERE id_video = ?`,[req.description,req.url,req.type_car,req.UPDATE_BY]);

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

    async videodelete(req) {
        try {
             await this.DBRepository.executeQuery(`delete from video where id_video=?`,[req.id_video]);

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
const videoService = new VideoService();
module.exports = videoService;