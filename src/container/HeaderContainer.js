import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import HeaderComponent from '../subcomponent/Header';

const mapDispatchToProps = (dispatch) => ({
    

});


const mapStateToProps = (state) => ({
    

});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(HeaderComponent)
);