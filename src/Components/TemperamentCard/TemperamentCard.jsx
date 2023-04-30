

export default function TemperamentCard(props) {


return (
    <li>
        {props.name}
        <button type="button" value={props.name} onClick={(e) => {
            e.preventDefault();
            props.onClose(props.name);}
            }>
            X
        </button>
    </li>
)};
  