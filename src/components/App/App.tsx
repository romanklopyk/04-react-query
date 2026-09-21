// import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import React from "react";
import fetchMovies from '../../services/movieService';
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";
import type {Movie} from '../../types/movie';
import toast, {Toaster} from 'react-hot-toast';
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";

function App() {
    const [movies, setMovies] = React.useState<Movie[]>([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);

    async function handleSearch(query: string) {
        try {
            setIsError(false);
            setIsLoading(true);
            const results = await fetchMovies(query);
            setMovies(results);
            if (!results.length)
                toast("No movies found for your request.");
        }
        catch (e) {
            setIsError(true);
        }
        finally {
            setIsLoading(false);
        }
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    function handleSelectedMovie(movie: Movie) {
        setSelectedMovie(movie);
        openModal();
        console.log(movie);
    }

    function handleCloseModal() {
        closeModal();
        setSelectedMovie(null);
    }

    return (
        <>
            <Toaster/>
            <SearchBar onSubmit={handleSearch}/>
            {isLoading && <Loader/>}
            {!isLoading && isError && <ErrorMessage/>}
            {movies.length > 0 && <MovieGrid
                movies={movies}
                onSelect={handleSelectedMovie}
            />}
            {isModalOpen && selectedMovie &&
                <MovieModal movie={selectedMovie} onClose={handleCloseModal}/>}
        </>
    )
}

export default App
