import {get, post} from "lin/plugins/axios";

class Content {
    static async getContentList() {
        const res = await get('v1/content');
        return res
    }

    static async addContent(data) {
        const res = await post('v1/content', {...data});
        return res;
    }
}

export {
    Content as ContentModel
}
