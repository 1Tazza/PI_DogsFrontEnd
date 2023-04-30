import axios from "axios"

export const GET_DOG_API = "GET_DOG_API";
export const GET_DOG_BY_RACE = "GET_DOG_BY_RACE";
export const SORTING_DOGS = "SORTING_DOGS";
export const DOGS_FILTER = "DOGS_FILTER";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const SET_PAGE = "SET_PAGE";
export const POST_DOG = "POST_DOG";
export const ADD_TEMPERAMENTS = "ADD_TEMPERAMENTS";
export const START_BUTTON = "START_BUTTON";

export const getDogApi = () => {
    return function(dispatch) {
    return axios.get("http://localhost:3001/dogs")
    .then(e => e.data)
    .then(dogs => 
    dispatch({type: "GET_DOG_API", payload: dogs})
    ) 
    }
};

export const getDogByRace = (name) => {
    return function(dispatch) {
        return axios.get(`http://localhost:3001/dogs?name=${name}`)
        .then(e => e.data)
        .then(dog => 
        dispatch({type: "GET_DOG_BY_RACE", payload: dog})    
        )
    }
};

export const startButton = () => {
    return {type: "START_BUTTON"}
};

export const sortingDogs = (sort) => {
    return {type: "SORTING_DOGS", payload: sort}
};

export const dogsFilter = (parameter) => {
    return {type: "DOGS_FILTER", payload: parameter}
};

export const getTemperaments = () => {
    return function(dispatch) {
        return axios.get("http://localhost:3001/temperaments")
        .then(e => e.data)
        .then(temperaments => 
            dispatch({type: "GET_TEMPERAMENTS", payload: temperaments}))
    }
};

export const addTemperaments = (temperaments) => {
    return {type: "ADD_TEMPERAMENTS", payload: temperaments}
}

export const setPage = (num) => {
    return {type:"SET_PAGE", payload: num}
};

export const postDog = (dog) => {
    return function(dispatch) {
        return axios.post("http://localhost:3001/dogs", dog)
        .then(recurso => recurso.data)
        .then(obj => 
            dispatch({type:"POST_DOG", payload: obj}))
    }
}




