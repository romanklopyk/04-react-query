import css from './MovieModal.module.css';
import React, {type ReactPortal} from "react";
import {createPortal} from 'react-dom';
import type {Movie} from "../../types/movie.ts";
import {useEffect} from "react";

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

function MovieModal({movie, onClose}:MovieModalProps):ReactPortal {

    function handleBackdropClick (event: React.MouseEvent<HTMLDivElement>) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    useEffect(()=>{
        function handleEscape (e: KeyboardEvent){
            if (e.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        }
    }, [onClose])

    return createPortal(
        <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
            <div className={css.modal}>
                <button onClick={onClose} className={css.closeButton} aria-label="Close modal">
                    &times;
                </button>
                {movie.backdrop_path && (<img
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.title}
                    className={css.image}
                />)}
                <div className={css.content}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p>
                        <strong>Release Date:</strong> {movie.release_date}
                    </p>
                    <p>
                        <strong>Rating:</strong> {movie.vote_average}/10
                    </p>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default MovieModal;