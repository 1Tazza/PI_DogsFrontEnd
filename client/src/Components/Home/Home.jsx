import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import c from "./home.module.css"
import * as actions from "../../Redux/Actions"

import Paginado from "../Paginado/Paginado"
import Card from "../Card/Card"
import SearchBar from "../SearchBar/SearchBar";
import Nav from "../Nav/Nav"
import Loading from "../Loading/Loading"

export default function Home() {

const dispatch = useDispatch()


const dogs = useSelector(state => state.dogs)

const filDogs = useSelector(state => state.filDogs)

const filInside = useSelector(state => state.filInside)

const temperaments = useSelector(state => state.temperaments)

const filTemperaments = useSelector(state => state.filTemperaments)

const currentPage = useSelector(state => state.currentPage)

const itemsPerPage = useSelector(state => state.itemsPerPage)

const actualPage = typeof(filDogs) === "string" ? [] : filInside.length > 0 ? filInside.slice((currentPage - 1 ) * itemsPerPage, currentPage * itemsPerPage) : filDogs.length > 0 ? filDogs.slice((currentPage - 1 ) * itemsPerPage, currentPage * itemsPerPage) : dogs.slice((currentPage - 1 ) * itemsPerPage, currentPage * itemsPerPage);



const [state, setState] = useState({
   isLoading : true,
   estado: ""
})

 useEffect(() => {
   dispatch(actions.getTemperaments());
   dispatch(actions.getDogApi()).then(() => {
     setState({...state, isLoading: false });
   });
 }, [dispatch]);

 

const disable = filDogs === "NO_FOUND" 


function handleOrderChange(e) {
   setState({...state, estado: e.target.value});
   dispatch(actions.sortingDogs(e.target.value))
}

function handleFilterChange(e) {
   setState({...state, estado: e.target.value});
   dispatch(actions.dogsFilter(e.target.value))
}


return(<div className={c.background}>
  
   <Nav/>

  <div className={`${c.justcenter} ${c.column}`}>
    
      <SearchBar/>
    

   <div className={c.nav}>
      <span className={c.row}>
   <div className={c.margin}>
     <select className={`${c.selectOrder} ${c.selectHome} `} disabled={disable} id="order" onChange={(e) => handleOrderChange(e)}>
       <option value="" selected disabled >Ordenar por...</option>
       <option value="A-Z">Ordenar Alfabeticamente(A-Z)</option> 
       <option value="Z-A">Ordenar Alfabeticamente(Z-A)</option>
       <option value="Peso mayor">Peso(Mayor a menor)</option> 
       <option value="Peso menor">Peso(Menor a mayor)</option>
     </select>
   </div>
   
   <div>
      <select className={`${c.select} ${c.selectHome}`} disabled={disable || (filDogs.length > 0 && filDogs.every(e => e.temperament === null))} id="filter" onChange={(e) => handleFilterChange(e)}>
         <option value="" selected disabled >Filtrar por...</option>
         <option value="all">All</option>
         <option value="db">DataBase</option>
         <option value="api">Api</option>
         {filTemperaments.length > 0 ? filTemperaments.map(el => <option value={el} >{el}</option>) : temperaments.map(el => <option value={el} >{el}</option>)}
      </select>
   </div>
      </span>
   <br />
    {dogs.length > 0 && state.isLoading === false && !disable ? <Paginado totalItems={filInside.length > 0 ? filInside.length : filDogs.length > 0 ? filDogs.length : dogs.length} itemsPerPage={itemsPerPage}/> : null}
    
    </div>
    </div>
   {state.isLoading ? <div className={c.nav}><Loading/></div> : <div className={`${c.row} ${c.container}`}> {actualPage.map( el => <Card key={el.id} id={el.id} name={el.name} img={el.img} temperament={el.temperament} weight={el.weight} />)} </div>}
   {disable ? <h2>la raza seleccionada no se encuentra disponible...</h2> : null}

   
   <div className={`${c.justcenter} ${c.column} ${c.buttonPadd}`}>
    {dogs.length > 0 && state.isLoading === false && !disable ? <Paginado totalItems={filInside.length > 0 ? filInside.length : filDogs.length > 0 ? filDogs.length : dogs.length} itemsPerPage={itemsPerPage}/> : null}
    </div>
</div>)
} 