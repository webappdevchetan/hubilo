import React from 'react';
import {  Card } from "react-bootstrap";
const MovieCard = ({movie}) => (
    <>
        {movie.Poster !== null && <Card.Img variant="top" className="image-spacing" src={movie.Poster} />}
        <Card.Body>
            <Card.Title className="justify-content-md-center">{movie.Title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Year : {movie.Year}</Card.Subtitle>
        </Card.Body>
    </>
);
export default MovieCard;