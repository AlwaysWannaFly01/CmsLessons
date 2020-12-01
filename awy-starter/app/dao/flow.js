import {FlowModel} from "../models/flow";
import {NotFound} from 'lin-mizar';

class Flow {
    static async createFlow(v) {
        const res = await FlowModel.create({
            index: v.get('body.index'),
            type: v.get('body.type'),
            art_id: v.get('body.art_id'),
            status: v.get('body.status')
        })
        return res;
    }

    static async getFlowList() {
        return await FlowModel.findAll({
            //按照index排序
            order: ['index']
        })
    }
}

export {Flow as FlowDao}
