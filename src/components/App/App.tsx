import SearchBar from '../SearchBar/SearchBar';
import React from "react";
import fetchMovies from '../../services/movieService';
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import type {Movie, MoviesResponse} from '../../types/movie';
import Loader from "../Loader/Loader.tsx";
import Error from "../ErrorMessage/ErrorMessage.tsx";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import toast,{Toaster} from "react-hot-toast";
import MovieModal from "../MovieModal/MovieModal.tsx";
import Pagination from "../Pagination/Pagination.tsx";


function App() {

    const [query, setQuery] = React.useState<string>('');
    const [page, setPage] = React.useState<number>(1);
    const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);

    function handleSearch(q: string) {
        setQuery(q);
        setPage(1);
    }

    const {data, isLoading, isError, isSuccess} = useQuery<MoviesResponse>({
        queryKey: ['movies', query, page],
        queryFn: () => fetchMovies(query, page),
        enabled: query !== '',
        placeholderData: keepPreviousData
    })

    React.useEffect((): void => {
        if (data?.results.length === 0) {
            toast.error('No results found');
        }
        }, [data])

    function onSelect(movie: Movie): void {
        setSelectedMovie(movie);

    }

    function onClose(): void {
        setSelectedMovie(null);
    }

    function onPageChange(page: number):void {
        setPage(page);
    }

    return (
        <>
            <Toaster/>
            <SearchBar onSubmit={handleSearch}/>
            {isLoading && <Loader/>}
            {isError && <Error/>}
            {isSuccess && <MovieGrid movies={data.results} onSelect={onSelect}/>}
            {isSuccess && data.total_pages > 1 && (
                <Pagination
                    totalPages={data?.total_pages ?? 0}
                    currentPage={page}
                    onPageChange={onPageChange}/>
            )}
            {selectedMovie && <MovieModal movie={selectedMovie} onClose={onClose}/>}
        </>
    )
}

export default App
