import React, { useState, useEffect  } from 'react';
import Loader from '../subcomponent/Loader';
import Header from '../container/HeaderContainer';
import { getUrl } from '../services/network/urls';
import { Container, Row, Col, Form, Card, Alert, Button  } from "react-bootstrap";
import MovieCard from '../subcomponent/MovieCard'
const range = (start, end) => {
    var year = [];
    for (let i = start; i <= end; i++) {
        year.push(i);
    }
    return year;
}
function MovieListComponent(props) {
    const [showStatus, setShowStatus] = useState(true)
    const [loading, setloading] = useState(true)
    const [yearSelect, setYearSelect] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [showToaster, setShowToaster] = useState(false)
    const [movies, setMovies] = useState(props.movie)
    const [yearDropdown] = useState(range(2000, new Date().getFullYear()))
    const [selectedMovie, setSelectedMovie] = useState([])
  
    useEffect(() => {
        getMovieList()
    }, [yearSelect])
  

    const getMovieList = () => {

        let url = getUrl('GET_LIST');
        if (yearSelect !== '' && yearSelect !== undefined && yearSelect > 0){
            url = url + '&year=' + yearSelect
        }
        fetch(url, {
            method: 'get',
        }).then(response => response.json())
        .then(data => {
            if (data.Response){
                props.setMovies(data.Search)
                setMovies(data.Search);
            }else{
                setErrorMessage('Something went Wrong, try again Some time.')
                setShowToaster(true)
            }
            setloading(false)
        });
    }

    const handleYearSelect = (e) => {
        let year = e.target.value;
        setYearSelect(year)
    }

    const handleMyListClick = ( e , movie) => {
        let myList =  [...selectedMovie]
        let key = myList.findIndex(value => value.imdbID === movie.imdbID)
        if (e.target.checked){
            if (key > -1) {
                myList[key].watched = false
            }else{
                movie.watched = false
                myList.push(movie);
            }
        }else{
            myList.splice(key, 1);
        }
        setSelectedMovie(myList)  
    }

    const handleButtonClick = (status) =>{
        if (status === 'mylist'){
            props.setMyList([ ...props.myList, ...selectedMovie ])
        }else{
            selectedMovie.map((movie) => {
                movie.watched = true
                return movie;
            })
            const map = new Map();
            props.myList.forEach(item => map.set(item.imdbID, item));
            selectedMovie.forEach(item => map.set(item.imdbID, { ...map.get(item.imdbID), ...item }));
            const mergedArr = Array.from(map.values());
            props.setMyList(mergedArr)
        }
        setSelectedMovie([])
    }
    return (
        <React.Fragment>
            {loading && <Loader />}
            <Alert variant="danger" onClose={() => setShowToaster(false)} show={showToaster} dismissible>
                <Alert.Heading>Error</Alert.Heading>
                <p>
                    {errorMessage}
                </p>
            </Alert>
            
            <Container>
                <Header />
                <Row >
                    <Col>
                        <Form.Group as={Row} className="justify-content-md-center">
                            <Col lg="2" md="3">
                                <Form.Label>Year</Form.Label>
                            </Col>

                            <Col lg="4" md="4">
                                <Form.Control as="select" onChange={handleYearSelect} >
                                    <option>Select</option>
                                    {yearDropdown.map(value => (<option key={value} value={value}>{value}</option>))}
                                </Form.Control>
                            </Col>

                            <Col lg="4" md="4">
                                <Button onClick={() => handleButtonClick('mylist')}>Add To My List</Button>
                                <Button onClick={() => handleButtonClick('watched')}>Add To Watched List</Button>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                {movies.length > 0 ? <Row>
                    {movies.map((movie) => <Col sm="4" key={"movie_" + movie.imdbID} className="mt-4">
                            <Card>
                                <MovieCard movie={movie}/>
                                <Card.Footer>
                                <Form.Check type="checkbox" name="my_list" onChange={(e) => handleMyListClick(e, movie)} checked={selectedMovie.findIndex(value => value.imdbID === movie.imdbID) > -1} id={"movie_my_list" + movie.imdbID}  />
                                </Card.Footer>
                            </Card>
                        </Col>
                    )}
                    
                </Row>
                        : <Row>
                        <Col>Movie Not found</Col>
                    </Row>}
                    
            </Container>
        </React.Fragment>
    )
    
}

export default MovieListComponent;
