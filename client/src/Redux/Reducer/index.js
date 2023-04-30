

const initialState = {
    dogs: [],
    temperaments: [],
    filDogs: [],
    filInside: [], 
    filTemperaments: [],
    currentPage: 1,
    itemsPerPage: 9

}


export default function rootReducer(state = initialState, action) {
    if(action.type === "GET_DOG_API"){
  
      return {...state, dogs: action.payload}
    }

    else if (action.type === "GET_DOG_BY_RACE") {
      const getDogByRace = action.payload
      var filTemps = getDogByRace.map(el => el.temperament).join(",").split(",").map(el => el[0] === " " ? el.slice(1) : el.slice(0) )
      filTemps = Array.from(new Set(filTemps)).filter(el => el !== "")
      if(getDogByRace.length === 0) { return {...state, filDogs: "NO_FOUND", filTemperaments: filTemps, currentPage: 1}}
      return {...state, filDogs: getDogByRace, filTemperaments: filTemps, currentPage: 1}
    }

    else if (action.type === "GET_TEMPERAMENTS") {
      if(state.temperaments.length > action.payload.length) {return state}

      return {...state, temperaments: action.payload}
    }
    
    else if (action.type === "DOGS_FILTER") {
      if(action.payload === "all" && state.filInside.length > 0) {return{...state, filInside: [], currentPage: 1}}

      else if(action.payload === "all" && state.filDogs.length > 0 && state.filTemperaments.length > 0) {return{...state, filInside: [], currentPage: 1}}

      else if(action.payload === "all") {return{...state, filDogs: [], currentPage: 1}}

      else if (action.payload === "db" && state.filTemperaments.length > 0) {
      
        let filDogs = state.filDogs.filter(el => typeof(el.id) === "string")
        return{...state, filInside: filDogs, currentPage: 1 }
      }

      else if(action.payload === "db") {
      
        let filDogs = state.dogs.filter(el => typeof(el.id) === "string")
        return{...state, filDogs: filDogs, currentPage: 1 }
      }

      else if (action.payload === "api" && state.filTemperaments.length > 0) {
      
        let filDogs = state.filDogs.filter(el => typeof(el.id) === "number")
        return{...state, filInside: filDogs, currentPage: 1 }
      }

      else if(action.payload === "api") {
      
        let filDogs = state.dogs.filter(el => typeof(el.id) === "number")
        return{...state, filDogs: filDogs, currentPage: 1 }
      }
      
      else if(state.filDogs.length > 0 && state.filTemperaments.length > 0) {
        const filDogs = state.filDogs.filter(function(el) {
          var result = el.temperament?.includes(action.payload) || []
          if(result === true) {return el}
        })
  
        return {...state, filInside: filDogs, currentPage: 1}
      }

      else {const filDogs = state.dogs.filter(function(el) {
        var result = el.temperament?.includes(action.payload) || []
        if(result === true) {return el}
      })

      return {...state, filDogs: filDogs, currentPage: 1}}
    }

    else if (action.type === "SORTING_DOGS") {
      function converter(num) { 
        if (num.includes("NaN")) {return 0}
        else if(num.includes("-") === false) {return parseInt(num)}
        return num.split("-").reduce((cur, aft) => parseInt(cur) + parseInt(aft)) / 2 }


      switch(action.payload){

        case "A-Z" :
          return {...state, dogs: state.dogs.sort((a,b)=> {return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1}), filDogs: state.filDogs.sort((a,b)=> {return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1})}
        case "Z-A" : 
          return {...state, dogs: state.dogs.sort((a,b)=> {return b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1}), filDogs: state.filDogs.sort((a,b)=> {return b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1})}
        case "Peso mayor" : 
          return {...state, dogs: state.dogs.sort((a,b) => {return converter(b.weight) - converter(a.weight)}), filDogs: state.filDogs.sort((a,b) => {return converter(b.weight) - converter(a.weight)})}
        case "Peso menor" : 
          return {...state, dogs: state.dogs.sort((a,b) => {return converter(a.weight) - converter(b.weight)}), filDogs: state.filDogs.sort((a,b) => {return converter(a.weight) - converter(b.weight)})}

        default : return action.payload
      }
        
    }

    else if (action.type === "SET_PAGE") {
      return{...state, currentPage: action.payload}
    }

    else if (action.type === "POST_DOG") {
      
      return{...state, dogs: [...state.dogs, action.payload]}
    }

    else if(action.type === "ADD_TEMPERAMENTS") {
      const result = state.temperaments.filter(el => el === action.payload).length > 0 
      if(result) {return{...state, temperaments: state.temperaments}}
      return{...state, temperaments: state.temperaments.concat(action.payload)}
    }
    
    else if(action.type === "START_BUTTON") {
      return {...state, filTemperaments: [], filInside: [], filDogs: [], currentPage: 1}
    }

    else {return state}
}