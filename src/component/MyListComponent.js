import React, { Component } from 'react';
import Loader from '../subcomponent/Loader';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Header from '../container/HeaderContainer';
import MovieCard from '../subcomponent/MovieCard'
class MyListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            movie: this.props.myList,
            showStatus:true,
            selectedMovie:[]
        }
    }
   
    handleSwitch =() =>{
        this.setState({
            showStatus: !this.state.showStatus
        })
    }


    handleButtonClick = (status) => {
        if (status === 'remove') {
            let selectedMovie = this.state.selectedMovie
            let myList = this.props.myList.filter(movie => selectedMovie.findIndex(value=> value.imdbID === movie.imdbID) === -1)
            this.props.setMyList(myList)
        } else {
            let selectedMovie = this.state.selectedMovie
            selectedMovie.map((movie) => {
                movie.watched = true
                return movie;
            })
            const map = new Map();
            this.props.myList.forEach(item => map.set(item.imdbID, item));
            selectedMovie.forEach(item => map.set(item.imdbID, { ...map.get(item.imdbID), ...item }));
            const mergedArr = Array.from(map.values());
            console.log(mergedArr)
            this.props.setMyList(mergedArr)
            
        }
        this.setState({
            selectedMovie: []
        })
    }


    handleCheckBoxClick = (e, movie) => {
        let myList = this.state.selectedMovie
        let key = myList.findIndex(value => value.imdbID === movie.imdbID)
        if (e.target.checked) {
            if (key === -1) {
                myList.push(movie);
            }
        } else {
            myList.splice(key, 1);
        }
        this.setState({
            selectedMovie: myList
        })
    }

    render() {
        let movies = this.props.myList
        if(!this.state.showStatus){
           movies = this.props.myList.filter(movie => movie.watched === true)
        }
        return (
            <Container>
                {this.state.loading && <Loader />}
                <Header />
                <Row>
                    <Col lg="8" className="mb-3" >
                        <Link to="/" className="btn btn-primary"> Go back</Link>
                    </Col>
                    <Col lg="4" md="4">
                        <Button onClick={() => this.handleButtonClick('remove')}>Remove To My List</Button>
                        {this.state.showStatus && <Button onClick={() => this.handleButtonClick('watched')}>Add To Watched List</Button> }
                    </Col>
                    <Col lg="12" className="mb-3" >
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label={this.state.showStatus ? 'Switch To My Watch List' : 'Switch to My List'}
                            value={this.state.showStatus}
                            onChange={this.handleSwitch}
                        />
                    </Col>
                    
                    
                        <>
                            <Col lg="12" className="mb-3" >
                            {this.state.showStatus ? <h3>My List</h3> : <h3>My Watched List</h3> }
                            </Col>
                            {
                                movies.length === 0 && <p>No Movie in list</p>
                            }
                            {movies.map((movie) => 
                            
                                <Col sm="4" key={"movie_" + movie.imdbID} className="mt-4">
                                    <Card>
                                        <MovieCard movie={movie} />
                                        <Card.Footer>
                                            <Form.Check type="checkbox" name="my_list" onChange={(e) => this.handleCheckBoxClick(e, movie)} checked={this.state.selectedMovie.findIndex(value => value.imdbID === movie.imdbID) > -1} id={"movie_my_list" + movie.imdbID} />
                                            
                                        </Card.Footer>
                                    </Card>
                                </Col>
                                
                            
                            )}
                        </> 
                    {/* <Col sm="3" className=" product_img">
                        <img src={"https://image.tmdb.org/t/p/w500/" + movie.backdrop_path} className="img-responsive" alt="title" />
                    </Col>
                    <Col sm="9" className="ml-6 product_content">
                        <h2><span>{movie.title}</span></h2>
                        <h3 className="cost"> Run Time : {movie.runtime}</h3>
                        <p>{movie.overview}</p>
                    </Col> */}
                </Row>
            </Container>
        )
    }
}

export default MyListComponent;