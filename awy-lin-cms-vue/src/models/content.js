import {get} from "lin/plugins/axios";

class Content {
    static async getContentList() {
        const res = await get('v1/content');
        return res
    }
}

export {
    Content as ContentModel
}
