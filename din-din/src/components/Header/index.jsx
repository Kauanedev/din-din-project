import logo from "../../assets/logo.svg";
import "./styles.css";


export default function Header () {

    return (
        <div>
            <img src={logo} alt="logo do site" className='logo' />
        </div>

    )
}