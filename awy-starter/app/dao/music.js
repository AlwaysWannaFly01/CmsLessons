import {MusicModel} from "../models/music";
import {NotFound} from 'lin-mizar';

class Music {
    static async getMusicList() {
        const res = await MusicModel.findAll()
        return res;
    }

    static async addMusic(v) {
        return await MusicModel.create(v)
    }

    static async editMusic(id, params) {
        //主键查询
        const music = await MusicModel.findByPk(id);
        if (!music) {
            throw new NotFound()
        }

        return await music.update({...params})
    }
}

export {Music as MusicDao}
