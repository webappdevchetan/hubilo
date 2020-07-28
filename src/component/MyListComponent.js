import React, { useState  } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Header from '../container/HeaderContainer';
import MovieCard from '../subcomponent/MovieCard'
function MyListComponent(props) {
    const [showStatus, setShowStatus] = useState(true)
    const [selectedMovie, setSelectedMovie] = useState([])
   
    const handleSwitch =() =>{
        setSelectedMovie([])
        setShowStatus(!showStatus);
    }

    const handleButtonClick = (status) => {
        if (status === 'remove') {
            let myList = props.myList.filter(movie => selectedMovie.findIndex(value=> value.imdbID === movie.imdbID) === -1)
            props.setMyList(myList)
        } else {
            selectedMovie.map((movie) => {
                movie.watched = true
                return movie;
            })
            const map = new Map();
            props.myList.forEach(item => map.set(item.imdbID, item));
            selectedMovie.forEach(item => map.set(item.imdbID, { ...map.get(item.imdbID), ...item }));
            const mergedArr = Array.from(map.values());
            console.log(mergedArr)
            props.setMyList(mergedArr) 
        }
        setSelectedMovie([])
    }

    const handleCheckBoxClick = (e, movie) => {
        console.log(movie)
        let myList = [...selectedMovie]
        let key = myList.findIndex(value => value.imdbID === movie.imdbID)
        console.log(key)
        console.log(selectedMovie)
        if (e.target.checked) {
            if (key === -1) {
                myList.push(movie);
            }
        } else {
            myList.splice(key, 1);
        }
        console.log(selectedMovie)
        setSelectedMovie(myList)  
    }

    
    let movies = props.myList
    if(!showStatus){
        movies = props.myList.filter(movie => movie.watched === true)
    }
    
    return (
        <Container>
            <Header />
            <Row>
                <Col lg="8" className="mb-3" >
                    <Link to="/" className="btn btn-primary"> Go back</Link>
                </Col>
                <Col lg="4" md="4">
                    <Button onClick={() => handleButtonClick('remove')}>Remove To My List</Button>
                    {showStatus && <Button onClick={() => handleButtonClick('watched')}>Add To Watched List</Button> }
                </Col>
                <Col lg="12" className="mb-3" >
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label={showStatus ? 'Switch To My Watch List' : 'Switch to My List'}
                        value={showStatus}
                        onChange={handleSwitch}
                    />
                </Col>
                <>
                    <Col lg="12" className="mb-3" >
                    {showStatus ? <h3>My List</h3> : <h3>My Watched List</h3> }
                    </Col>
                    {
                        movies.length === 0 && <p>No Movie in list</p>
                    }
                    {movies.map((movie) => 
                        <Col sm="4" key={"movie_" + movie.imdbID} className="mt-4">
                            <Card>
                                <MovieCard movie={movie} />
                                <Card.Footer>
                                    <Form.Check type="checkbox" name="my_list" onChange={(e) => handleCheckBoxClick(e, movie)} checked={selectedMovie.findIndex(value => value.imdbID === movie.imdbID) > -1} id={"movie_my_list" + movie.imdbID} />
                                </Card.Footer>
                            </Card>
                        </Col>
                    )}
                </> 
            </Row>
        </Container>
    )
}


export default MyListComponent;