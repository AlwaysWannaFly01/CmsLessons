import {get, post, put} from '../lin/plugins/axios'

class Flow {
    static async getFlowList() {
        const res = await get('v1/flow');
        return res;
    }

    static async addContentToFlow(index, type, art_id, status) {
        const res = await post('v1/flow', {
            index, type, art_id, status
        })
        return res
    }

    static async editFlow(id, index, type, art_id, status) {
        const res = await put(`v1/flow/${id}`, {
            id, index, type, art_id, status
        })
        return res;
    }
}

export {Flow as FlowModel}
