import React, { Component } from 'react';
import {  Card } from "react-bootstrap";
class MovieCard extends Component {

    render() {
        return (
            <>
                {this.props.movie.Poster !== null && <Card.Img variant="top" className="image-spacing" src={this.props.movie.Poster} />}
                <Card.Body>
                    <Card.Title className="justify-content-md-center">{this.props.movie.Title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Year : {this.props.movie.Year}</Card.Subtitle>
                </Card.Body>
            </>
            
        )
    }
}

export default MovieCard;