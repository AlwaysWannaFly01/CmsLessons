import {SentenceModel} from "../models/sentence";
import {NotFound} from 'lin-mizar';

class Sentence {
    static async getSentenceList() {
        const res = await SentenceModel.findAll()
        return res;
    }

    static async addSentence(v) {
        return await SentenceModel.create(v)
    }

    static async editSentence(id, params) {
        //主键查询
        const sentence = await SentenceModel.findByPk(id);
        if (!sentence) {
            throw new NotFound()
        }

        return await sentence.update({...params})
    }
}

export {Sentence as SentenceDao}
