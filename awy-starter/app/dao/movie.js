import {MovieModel} from "../models/movie";
import {NotFound} from 'lin-mizar';

class Movie {
    static async getMovieList() {
        const res = await MovieModel.findAll()
        return res;
    }

    static async addMovie(v) {
        return await MovieModel.create(v)
    }

    static async editMovie(id, params) {
        //主键查询
        const movie = await MovieModel.findByPk(id);
        if (!movie) {
            throw new NotFound()
        }

        return await movie.update({...params})
    }
}

export {Movie as MovieDao}
