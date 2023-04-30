import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../Redux/Actions";
import c from "./paginado.module.css"

export default function Paginado({totalItems, itemsPerPage}) {
//totalItems si es que va a acutar en dogs o en los perros filtrados
const dispatch = useDispatch()

const totalPages = Math.ceil(totalItems / itemsPerPage);

const currentPage = useSelector(state => state.currentPage)

const pageRange = []
//el currentPage - 2 y +2 es el rango que puede tener la visualizacion de botones
var startPage = Math.max(1, currentPage - 2);
var endPage = Math.min(totalPages, currentPage + 2);

//si el rango llega al punto de que se acaban los botones estos establecen el rango a no avanzar más sobre los botones y quedan estancados
if (endPage - startPage < 4) {
  //este si es a inicio de la pagina
    if (currentPage < 3) {
      endPage = Math.min(startPage + 4, totalPages);
    }
    // y este si es al final 
    else {
      startPage = Math.max(endPage - 4, 1);
    }
  }

for (var i = startPage; i <= endPage; i++) { pageRange.push(i)}

const prevButtonDisabled = currentPage === 1;
const nextButtonDisabled = currentPage === totalPages

const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
};

const handlePrevClick = () => {
    if (!prevButtonDisabled) {
    handlePageChange(currentPage - 1);
}};

const handleNextClick = () => {
    if (!nextButtonDisabled) {
    handlePageChange(currentPage + 1);
}};


return(<div className={c.border}>

 <div className={`${c.center}`}>
    <button className={`${c.button} ${c.prevNext}`} onClick={handlePrevClick} disabled={currentPage === 1}>Prev</button>
      {pageRange.map((number) => (
        <button key={number} onClick={() => handlePageChange(number)} className={`${currentPage === number ? c.active : ''} ${c.button} ${c.num}`}>
          {number}
        </button>
      ))}
    <button className={`${c.button} ${c.prevNext}`} onClick={handleNextClick} disabled={currentPage === totalPages}>Next</button>
 </div>


</div>)
}