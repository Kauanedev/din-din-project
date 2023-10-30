import './styles.css'
import Header from '../../components/Header'
import FormsRegister from '../../components/FormsRegister'

export default function Register (){
    
    return (
        <div className='container-page'>
            <Header/>
            <div className='container-register'>
                <FormsRegister />
            </div>
        </div>
    )
}