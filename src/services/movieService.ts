import axios from 'axios';
import type {Movie} from '../types/movie';

interface ResponseData {
    results: Movie[];
}

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const config =
    {
        baseURL: 'https://api.themoviedb.org/3',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
    }


async function fetchMovies(query: string): Promise<Movie[]>  {
    try {
        const response = await axios.get<ResponseData>('/search/movie', {
                ...config,
                params: {
                    query
                }
            }
        );
        console.log('response', response);
        return response.data.results;
    } catch
        (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

export default fetchMovies;