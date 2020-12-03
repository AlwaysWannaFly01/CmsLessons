import {get, post, put} from "lin/plugins/axios";

class Content {
    static async getContentList() {
        const res = await get('v1/content');
        return res
    }

    static async addContent(data) {
        const res = await post('v1/content', {...data});
        return res;
    }

    static async editContent(id, data) {
        const res = await put(`v1/content/${id}`, {...data});
        return res;
    }
}

export {
    Content as ContentModel
}
