import * as types from '../actions/actionTypes';

const initialState = {
  movie : [],
  myList: [ ],
};

const main = (state = initialState, action) => {
     switch (action.type) {
      case types.SET_MOVIE:
        return {
          ...state,
          movie: action.data,
        };
       case types.SET_MY_LIST:
         return {
           ...state,
           myList: action.data,
         };
       
      default:
        return state;
    }
  };
  
  export default main;
  