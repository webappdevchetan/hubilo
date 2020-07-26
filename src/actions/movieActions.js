import * as types from "./actionTypes";

export const setMovies = data => ({
    type: types.SET_MOVIE,
    data
});
export const setMyList = data => ({
    type: types.SET_MY_LIST,
    data
})
