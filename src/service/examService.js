const DBRepository = require('../repositories/DBRepository');

class ExamService {
    constructor() {
        this.DBRepository = new DBRepository();
    }
    async examView(req){
        try {
            let resultJson
            let choice=[]
            let exam_choice=[]
            let client = await this.DBRepository.executeQuery(`select  id_exam,exam_name,result from exam`);
            for(let i=0; i<client.length; i++){
                let examchoice = await this.DBRepository.executeQuery(`select id_exam_choice value,exam_choice_name label from exam_choice where id_exam=${client[i].id_exam}`);
                 choice = {...choice[i], ...examchoice};

                 for (const [key, value] of Object.entries(choice)) {
                    exam_choice.push(value)
                  }           
                 client[i].exam_choice=exam_choice
                 exam_choice=[]
                 choice=[]
            }
            
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

    async examInsert(req) {
        try {

                await this.DBRepository.executeQuery(`INSERT INTO exam
                (exam_name,
                CREATE_BY,
                CRATE_DATE)
                VALUES
                (?,?,CURRENT_TIMESTAMP)`,[req.exam_name,req.CREATE_BY]);
                let id=  await this.DBRepository.executeQuery(`select id_exam from exam where exam_name=?`,[req.exam_name]);
                for(let j=0; j<req.exam_choice.length; j++){
                  
                    
                    await this.DBRepository.executeQuery(`INSERT INTO exam_choice
                (id_exam,
                exam_choice_name,
                CREATE_BY,
                CRATE_DATE)
                VALUES
                (?,?,?,CURRENT_TIMESTAMP)`,[id[0].id_exam,req.exam_choice[j].value,req.CREATE_BY]);
                }
                let id_result=  await this.DBRepository.executeQuery(`select * from exam_choice where exam_choice_name=? and id_exam=?`,[req.result,id[0].id_exam]);
                await this.DBRepository.executeQuery(`UPDATE exam SET result=? WHERE id_exam = ?`,[id_result[0].id_exam_choice,id[0].id_exam]);
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

    async  examupdate(req) {
        try {

                await this.DBRepository.executeQuery(`UPDATE exam SET
                exam_name=?,
                result=?,
                UPDATE_BY = ?,
                UPDATE_DATE=CURRENT_TIMESTAMP
                WHERE id_exam = ?`,[req.exam_name,req.result,req.CREATE_BY,req.id_exam]);

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

    async examdelete(req) {
        try {
             await this.DBRepository.executeQuery(`delete from exam_choice where id_exam=?`,[req.id_exam]);
             await this.DBRepository.executeQuery(`delete from exam where id_exam=?`,[req.id_exam]);
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
const examService = new ExamService();
module.exports = examService;