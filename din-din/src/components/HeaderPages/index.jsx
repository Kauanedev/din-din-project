import logOut from '../../assets/logOut.svg';
import logo from "../../assets/logo.svg";
import profile from '../../assets/profile_avatar_icon.svg';
import "./styles.css";

export default function HeaderPages({handleModalEditProfile}) {
    const userName = JSON.parse(localStorage.getItem('loggedUser')).name.split(' ');
    const userFirstName = userName[0];


    const handleClick = () => {
        localStorage.setItem("isAuthenticated", false);
        localStorage.removeItem("loggedUser")
        window.location.reload()
    };

    return (
        <div className="container-header">


            <img src={logo} alt="logo do site" className='logo-headers-page' />

            <div className="container-logout">
                <img src={profile} alt="logo do perfi" className='profile' onClick={handleModalEditProfile} />
                <h3> {userFirstName}</h3>
                <img src={logOut} alt="logout" className='logOut' onClick={handleClick} />
            </div>
        </div>
    )
}   