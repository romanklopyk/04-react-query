import axios from 'axios';
import type {MoviesResponse} from '../types/movie';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const config =
    {
        baseURL: 'https://api.themoviedb.org/3',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
    }

async function fetchMovies(query: string, page: number): Promise<MoviesResponse> {
    try {
        const response = await axios.get<MoviesResponse>('/search/movie', {
                ...config,
                params: {
                    query,
                    page
                }
            }
        );
        // console.log('response.data', response.data);
        return response.data;
    } catch
        (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

export default fetchMovies;