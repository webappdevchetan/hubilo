import React, { Component } from 'react';
import Loader from '../subcomponent/Loader';
import Header from '../container/HeaderContainer';
import { getUrl } from '../services/network/urls';
import { Container, Row, Col, Form, Card, Toast, Button  } from "react-bootstrap";
import MovieCard from '../subcomponent/MovieCard'
const range = (start, end) => {
    var year = [];
    for (let i = start; i <= end; i++) {
        year.push(i);
    }
    return year;
}

class MovieListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: this.props.movie,
            loading:true,
            yearSelect:'',
            errorMessage:'',
            showToaster:false,
            yearDropdown: range(2000, new Date().getFullYear()),
            selectedMovie:[]
        }
    }
   
    componentDidMount(){
        this.getMovieList()
    }

    
    componentDidUpdate( prevProps) {
        if (this.props.movie !== prevProps.movie){
            this.setState({movies: this.props.movie})
        }
       
    }

    getMovieList = () => {

        let url = getUrl('GET_LIST');
        if (this.state.yearSelect !== '' && this.state.yearSelect !== undefined && this.state.yearSelect > 0){
            url = url + '&year=' + this.state.yearSelect
        }
        fetch(url, {
            method: 'get',
            // headers: { 'Content-Type': 'application/json' },

        }).then(response => response.json())
            .then(data => {
                if (data.Response){
                    this.props.setMovies(data.Search)
                }else{
                    this.setState({
                        errorMessage:'Something went Wrong, try again Some time.'
                    })
                }
                this.setState({
                    loading: false
                })
            });
        
    }

    setShow = (status) => {
        this.setState({
            showToaster: status
        })
    }

    handleYearSelect = (e) => {
        let year = e.target.value;
        this.setState({
            yearSelect: year,
        },() => {
            this.getMovieList();
        });
    }

     handleMyListClick = ( e , movie) => {
        let myList =  this.state.selectedMovie
        let key = myList.findIndex(value => value.imdbID === movie.imdbID)
        if (e.target.checked){
            if (key > -1) {
                myList[key].watched = false
                // myList.push(movie);
            }else{
                movie.watched = false
                myList.push(movie);
            }
        }else{
            myList.splice(key, 1);
        }
        console.log(myList)
        this.setState({
            selectedMovie: myList
        })
     }


    handleButtonClick = (status) =>{
        if (status === 'mylist'){
            let selectedMovie = this.state.selectedMovie
            this.props.setMyList([ ...this.props.myList, ...selectedMovie ])
        }else{
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


    render() {
        return (
            <React.Fragment>
                {this.state.loading && <Loader />}
                <Toast onClose={() => this.setShow(false)} show={this.state.showToaster} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Bootstrap Toast</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>This is simple Bootstrap Toast Example</Toast.Body>
                </Toast>
                <Container>
                    <Header />
                    <Row >
                        <Col>
                            <Form.Group as={Row} className="justify-content-md-center">
                                <Col lg="2" md="3">
                                    <Form.Label>Year</Form.Label>
                                </Col>

                                <Col lg="4" md="4">
                                    <Form.Control as="select" onChange={this.handleYearSelect} >
                                       <option>Select</option>
                                        {this.state.yearDropdown.map(value => (<option key={value} value={value}>{value}</option>))}
                                    </Form.Control>
                                </Col>

                                <Col lg="4" md="4">
                                    <Button onClick={() => this.handleButtonClick('mylist')}>Add To My List</Button>
                                    <Button onClick={() => this.handleButtonClick('watched')}>Add To Watched List</Button>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    {this.state.movies.length > 0 ? <Row>
                        {this.state.movies.map((movie) => <Col sm="4" key={"movie_" + movie.imdbID} className="mt-4">
                            
                                <Card>
                                    <MovieCard movie={movie}/>
                                    <Card.Footer>
                                    {/* <Button type="button" className="mb-3" onClick={(e) => this.handleMyListClick(e, movie, 'false')}>Add To My List</Button>
                                    <Button type="button" className="mb-3" onClick={(e) => this.handleMyListClick(e, movie, 'true')}>Add to My Watched list</Button> */}
                                    <Form.Check type="checkbox" name="my_list" onChange={(e) => this.handleMyListClick(e, movie)} checked={this.state.selectedMovie.findIndex(value => value.imdbID === movie.imdbID) > -1} id={"movie_my_list" + movie.imdbID}  />
                                    {/* <Form.Check type="checkbox" name="add_to_watched_list" onChange={(e) => this.handleMyWatchListClick(e, movie)} checked={this.props.myWatchedList.findIndex(value => value.imdbID === movie.imdbID) > -1}  label="Add to my watched list" id={"movie_watched_list" + movie.imdbID} /> */}
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
}

export default MovieListComponent;
