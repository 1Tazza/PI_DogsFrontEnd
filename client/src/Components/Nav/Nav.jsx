import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../../Redux/Actions/index"
import c from "./nav.module.css"

export default function Nav() {
  
    const dispatch = useDispatch()
 
    return (
      <div className={c.margin} >
        <Link to="/home">
        <button className={c.home} onClick={() => {dispatch(actions.startButton());dispatch(actions.getDogApi())}}>
        Home
        </button>
        </Link>
        <Link to="/dog/createDog">
          <button className={c.create}>
        Create Dog
        </button>
        </Link>
      </div>
    );
}