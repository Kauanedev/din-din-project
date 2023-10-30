import { useEffect, useState } from 'react';
import './styles.css'
import { Link, useNavigate } from 'react-router-dom';


export default function FormsRegister () {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const navigate = useNavigate();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const [userId, setUserId] = useState(
        JSON.parse(localStorage.getItem('idUser')) || 1
    );
   
    useEffect( () => {
        localStorage.setItem('idUser', JSON.stringify(userId)) 
    }, [userId] )

    const isEmailAlreadyExists = (email) => {
        return users.some((user) => user.email === email);
      }; 
      
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        checkPassword: '',
        id: userId
    })
    const [error, setError] = useState('');
    const [sucess, setSucess] = useState('');
    

    function handleSubmit ( e ) {
        e.preventDefault();

        setError( '' )
        setSucess( '' )

        if ( !form.name || !form.email || !form.password || !form.checkPassword ) {
            setError( 'Todos os campos são obrigatórios.' )
        }
        else if ( !regexEmail.test( form.email ) ) {
            setError( 'E-mail inválido' )
        }
        else if ( isEmailAlreadyExists( form.email ) ) {
            setError( 'Este email já está cadastrado.' );
        }
        else if ( form.password.length < 6 ) {
            setError( 'A senha deve ter mais de 6 digitos' );
        }
        else if ( form.password !== form.checkPassword ) {
            setError( 'As senhas não conhecidem' )
        }
        else {
            localStorage.setItem('users', JSON.stringify([...JSON.parse(localStorage.getItem('users') || '[]'), form]));
            setSucess('Cadastro realizado com Sucesso.')
            setUserId(userId +1);
            
            setTimeout(() => {
                navigate('/login');
                setForm({
                    name: '',
                    email: '',
                    password: '',
                    checkPassword: '',
                    id: userId
                })
                setError('')
                setSucess('')
            }, 100);

        }

    }

    function handleChangeForm ( e ) {
        const value = e.target.value;
        setForm( { ...form, [ e.target.name ]: value } );
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastre-se</h2>
            <div >
                <p>Nome</p>
                <input
                    type="text"
                    placeholder='Digite seu nome'
                    value={form.name}
                    name='name'
                    onChange={( e ) => handleChangeForm( e )}
                />
            </div>
            <div>
                <p>E-mail</p>
                <input
                    type="text"
                    placeholder='Digite seu E-mail'
                    value={form.email}
                    name='email'
                    onChange={( e ) => handleChangeForm( e )}
                />
            </div>
            <div>
                <p>Senha</p>
                <input
                    type="password"
                    placeholder='Digite sua senha'
                    value={form.password}
                    name='password'
                    onChange={( e ) => handleChangeForm( e )}
                />
            </div>
            <div >
                <p>Confirmação de senha</p>
                <input
                    type="password"
                    placeholder='Digite sua senha novamente'
                    value={form.checkPassword}
                    name='checkPassword'
                    onChange={( e ) => handleChangeForm( e )}
                />
            </div>
            <div className='container-button' >
                <button type='submit'>Cadastrar </button>
                <Link to='/login'>Já tem cadastro? Clique aqui!</Link>
                {error && <span className='error'>{error}</span>}
                {sucess && <span className='sucess'>{sucess}</span>}
            </div>
        </form>
    )

}   