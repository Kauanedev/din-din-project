import HeaderPages from '../../components/HeaderPages';
import ModalEditProfile from '../../components/ModalEditProfile';
import Resumo from '../../components/Resumo';
import Tabela from '../../components/Tabela';
import { useEffect, useState } from 'react';
import './styles.css';

export default function Home () {
    const user = JSON.parse(localStorage.getItem('loggedUser'))
    const userId = user.id
    
    const [listaTransacoes, setListaTransacoes] = useState(
        JSON.parse(localStorage.getItem(`dadosTransacoes_${userId}`)) || []
      );
    const [editTransacoes, setEditTransacoes] = useState(false)
    const [ modalOpen, setModalOpen ] = useState( false )
    const [formTransacao, setFormTransacao ] = useState({
        valor: '',
        categoria: '',
        data: '',
        descricao: '',
   });
    const [ error, setError ] = useState( '' );
    const [openModalEditProfile, setOpenModalEditProfile] = useState(false);



    useEffect(() => {
        localStorage.setItem(`dadosTransacoes_${userId}`, JSON.stringify(listaTransacoes))        
    }, [listaTransacoes]);
    
    function handleModal (edit) {
        setModalOpen( !modalOpen )
        setEditTransacoes(edit)
        setError( '' )
        if(editTransacoes){
            setFormTransacao('')
        }
    }

    function handleModalEditProfile () {
        setOpenModalEditProfile(!openModalEditProfile)
    }

    return (
        <div>

            <HeaderPages 
              handleModalEditProfile = { handleModalEditProfile}
            />

            <div className='container-main'>

                <div className='esquerda'>
                    <Tabela
                        listaTransacoes={listaTransacoes}
                        setListaTransacoes={setListaTransacoes}
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        handleModal={handleModal}
                        setError={setError}
                        error={error}
                        editTransacoes={editTransacoes}
                        setEditTransacoes={setEditTransacoes}
                        setFormTransacao={setFormTransacao}
                        formTransacao= {formTransacao}
                    />
                </div>

                <div className='direita'>
                    <Resumo
                        handleModal={handleModal}
                        listaTransacoes={listaTransacoes}
                    />

                </div>
            </div>
            <div>
                <ModalEditProfile 
                handleModalEditProfile= {handleModalEditProfile}
                setOpenModalEditProfile = {setOpenModalEditProfile}
                openModalEditProfile = {openModalEditProfile}
                user={user}
                />
            </div>
        </div>
    )
}