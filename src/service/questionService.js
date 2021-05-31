const DBRepository = require('../repositories/DBRepository');

class QuestionService {
    constructor() {
        this.DBRepository = new DBRepository();
    }
    async questionView(req){
        try {
            let resultJson

            let client = await this.DBRepository.executeQuery(`select id_question, question,answer,DATE_FORMAT(CRATE_DATE, "%Y-%m-%d %T") CRATE_DATE, CREATE_BY,DATE_FORMAT(UPDATE_DATE, "%Y-%m-%d %T") UPDATE_DATE, UPDATE_BY from question`);

            
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

    async questionInsert(req) {
        try {

            await this.DBRepository.executeQuery(`INSERT INTO question
            (question,
            answer,
            CREATE_BY,
            CRATE_DATE)
            VALUES
            (?,?,?,CURRENT_TIMESTAMP)`,[req.question,req.answer,req.CREATE_BY]);

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

    async  questionupdate(req,Base64) {
        try {

            await this.DBRepository.executeQuery(`UPDATE question
            SET
            question = ?,
            answer = ?,
            UPDATE_BY = ?,
            UPDATE_DATE=CURRENT_TIMESTAMP
            WHERE id_question = ?`,[req.question,req.answer,req.CREATE_BY,req.id_question]);

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

    async questiondelete(req) {
        try {
             await this.DBRepository.executeQuery(`delete from question where id_question=?`,[req.id_question]);

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
const questionService = new QuestionService();
module.exports = questionService;