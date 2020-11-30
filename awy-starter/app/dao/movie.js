import {MovieModel} from "../models/movie";

class Movie {
    static async getMovieList() {
        const res = await MovieModel.findAll()
        return res;
    }

    static async addMovie(v) {
        return await MovieModel.create(v)
    }
}

export {Movie as MovieDao}
