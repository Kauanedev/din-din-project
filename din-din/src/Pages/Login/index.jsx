import './styles.css';
import Header from '../../components/Header';
import FormsLogin from '../../components/FormsLogin';
import { Link } from 'react-router-dom';


export default function Login ({loginConfirm, setLoginConfirm}){
    return (
        <div className='container-page'>
            <Header/>
            <div className='container-login'>
                <div className='description'>
                    <h1>Controle suas <strong>finanças</strong>, sem planilha chata. </h1>
                    <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, 
                        você tem tudo num único lugar e em um clique de distância.</p>
                    <Link to='/register'>
                        <button className='container-buttom'>Cadastre-se</button>
                    </Link>
                </div>
                <FormsLogin
                     loginConfirm={loginConfirm} 
                     setLoginConfirm={setLoginConfirm}                
                />
            </div>
        </div>  
    )
}   