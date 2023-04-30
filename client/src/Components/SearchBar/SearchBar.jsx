import { useState } from "react"
import { useDispatch} from "react-redux"
import * as actions from "../../Redux/Actions"
import c from "./searchbar.module.css"

export default function SearchBar() {

const dispatch = useDispatch()

const [name, setName] = useState("")

return(<div className={c.row}>
    
    <input className={c.input} value={name} onChange={e => setName(e.target.value)} placeholder="Nombre.." type="text" />
    <button className={c.button} onClick={() => name.length > 0 ? dispatch(actions.getDogByRace(name)): null}>Buscar</button>
    
    </div>)
}