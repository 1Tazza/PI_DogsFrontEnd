import {Link} from "react-router-dom"
import c from "./landing.module.css"

export default function Landing() {


return(<div className={c.background}>
 <div className={c.center}>
    <h1 className={c.title}>PROYECTO HENRY</h1>

    <Link to="/home">  
    <button className={c.button} type="button">
    <h1>Start!</h1>
    </button>
    </Link>
 </div>

</div>)
}