import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MovieListComponent from '../component/MovieListComponent';
import { setMovies, setMyList  } from '../actions/movieActions'
const mapDispatchToProps = (dispatch) => ({
    setMovies: (data) => dispatch(setMovies(data)),
    setMyList: (data) => dispatch(setMyList(data)),
});


const mapStateToProps = (state) => ({
    movie: state.main.movie,
    myList:state.main.myList,
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MovieListComponent)
);