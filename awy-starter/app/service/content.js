import {MovieDao} from "../dao/movie";
import {MusicDao} from "../dao/music";
import {SentenceDao} from "../dao/sentence";
import {NotFound} from 'lin-mizar';

class Content {
    static async addContent(v) {
        switch (v['type']) {
            case 100:
                //电影
                delete v['url']
                await MovieDao.addMovie(v)
                break;
            case 200:
                //音乐
                await MusicDao.addMusic(v)
                break;
            case 300:
                //句子
                delete v['url']
                await SentenceDao.addSentence(v)
                break;
            default:
                throw new NotFound({
                    msg: '内容类型不存在'
                })
        }
    }
}

export {
    Content as ContentService
}
