import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './styles.css';


export default function FormsLogin({loginConfirm, setLoginConfirm}) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const userVerification = (email, password) => {
        return users.find((user) =>
            user.email === email && user.password === password
        );
    };


    const navigate = useNavigate();
    const [error, setError] = useState('');


    function handleSubmit(e) {
        e.preventDefault();
        const authenticatedUser = userVerification(loginConfirm.email, loginConfirm.password);
        setError('');
        if (!loginConfirm.email || !loginConfirm.password) {
            setError('Deve ser informado email e senha para continuar')
        }
        else if (authenticatedUser) {
            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem('loggedUser', JSON.stringify(authenticatedUser));
            setTimeout(() => {
                navigate('/home');
                setError('')
                setLoginConfirm({
                    email: '',
                    password: ''
                })
            }, 1000);
        }
        else {
            setError('Email e/ou senha incorreto(s)')
        }
    }
    function handleChangeForm(e) {
        const value = e.target.value;
        setLoginConfirm({...loginConfirm, [e.target.name]: value});
    }

    return (
        <div className='container-login'>
            <form onSubmit={handleSubmit} >
                <h2>Login</h2>
                <div>
                    <p>E-mail</p>
                    <input
                        type="text"
                        placeholder='Digite seu E-mail'
                        value={loginConfirm.email}
                        name='email'
                        onChange={(e) => handleChangeForm(e)}
                    />
                </div>
                <div>
                    <p>Password</p>
                    <input
                        type="password"
                        placeholder='Digite sua senha'
                        value={loginConfirm.password}
                        name='password'
                        onChange={(e) => handleChangeForm(e)}
                    />
                </div>
                <div className='container-button-login'>
                    <button type='submit'>Entrar</button>
                    {error && <span className='error-login'>{error}</span>}
                </div>

            </form>
        </div>
    )
}
