import { useState } from 'react';
import editarIcon from '../../assets/editar.svg';
import filtroIcon from '../../assets/filtro_icon.svg';
import lixeira from '../../assets/lixeira.svg';
import arrowup from '../../assets/arrowup.svg';
import arrwdown from '../../assets/arrowdown.svg';
import ModalTransacoes from '../ModalTransacoes';
import "./styles.css";
import Filter from '../Filter';

export default function Tabela ( { listaTransacoes, setListaTransacoes, modalOpen, handleModal, setError, error, setEditTransacoes, editTransacoes, formTransacao, setFormTransacao } ) {
    const [ modalCloseAndOpenFilter, setModalCloseAndOpenFilter ] = useState( false );
    const handleClickModalFilter = () => {
        setModalCloseAndOpenFilter ( !modalCloseAndOpenFilter );
    };
    const [ handleInput, setHadleInput ] = useState( true );
    const [ordemCrescente, setOrdemCrescente] = useState(true);
    

    function deleteTransacao(id) {
        const newList= listaTransacoes.filter((transacao) => {
          return transacao.id !== id;
        });
      
        setListaTransacoes(newList);
    }

    function editarTransacao(id){
        const acharTransacao = listaTransacoes.find((transacao) => {
            return transacao.id === id
        })
        const localTransacao = acharTransacao;
        const data = localTransacao.data.split('/')
        const dataFormatada = `${data[2]}-${data[1]}-${data[0]}`;
        setEditTransacoes(true);
        setFormTransacao({
            data: dataFormatada, 
            categoria: localTransacao.categoria, 
            descricao: localTransacao.descricao,    
            valor: localTransacao.valor,
            inputOrOutput: localTransacao.inputOrOutput,
            id: localTransacao.id
        })
        setHadleInput(localTransacao.inputOrOutput);
        handleModal(true)
    }

    function ordenarPorData(transacoes, ordemCrescente) {
        return transacoes.sort((a, b) => {
            const [diaA, mesA, anoA] = a.data.split('/').map(Number);
            const [diaB, mesB, anoB] = b.data.split('/').map(Number);
    
            const dataA = new Date(anoA, mesA - 1, diaA); 
            const dataB = new Date(anoB, mesB - 1, diaB);
    
            if (ordemCrescente) {
                return dataA - dataB;
            } else {
                return dataB - dataA;
            }
        });
    }


    function toggleOrdem() {
        setOrdemCrescente((prevOrdem) => !prevOrdem);
    }

    return (
        <div className="container-home">
            <div className="filtro" >
                <div className="container-iconFilter" onClick={() => handleClickModalFilter()}>
                    <img src={filtroIcon} alt="Filtrar" />
                    <h1>Filtrar</h1>
                </div>
                {modalCloseAndOpenFilter && <Filter />}
            </div>

            <div className='tabela'>

                <div className='header-tabela'>
                    <div onClick={toggleOrdem} className='ordenar-data'>Data 
                        {ordemCrescente ?
                        <img src={arrowup} alt="seta para cima" /> :
                        <img src={arrwdown} alt= "seta para baixo"/>
                        }
                    </div>
                    <div>Dia da Semana</div>
                    <div>Descrição</div>
                    <div>Categoria</div>
                    <div>Valor</div>
                    <div></div>

                </div>

                <div className='teste'>
                {Array.isArray(listaTransacoes) && ordenarPorData(listaTransacoes, ordemCrescente).map((transacao) => {
                        return (
                            <div key={transacao.id} className= 'transacoes'>

                                <div>{transacao.data}</div>
                                <div>{transacao.diaSemana}</div>
                                <div>{transacao.descricao}</div>
                                <div>{transacao.categoria}</div>
                                <div className={transacao.inputOrOutput ? 'transacao-entrada' : 'transacao-saida'} >
                                     {transacao.valor}
                                </div>
                                <div>
                                    <img 
                                    src={editarIcon} 
                                    alt='Editar' 
                                    onClick={() => editarTransacao(transacao.id)} />
                                    <img
                                        src={lixeira}
                                        alt='Apagar'
                                        onClick={() => deleteTransacao(transacao.id)}
                                    />
                                </div>

                            </div>

                        )
                    } )}
                </div>


            </div>

            <ModalTransacoes
                handleModal={handleModal}
                modalOpen={modalOpen}
                setListaTransacoes={setListaTransacoes}
                listaTransacoes={listaTransacoes}
                setError={setError}
                error={error}
                editTransacoes = {editTransacoes}
                setFormTransacao={setFormTransacao}
                formTransacao= {formTransacao}
                handleInput = {handleInput}
                setHadleInput = {setHadleInput}
            />

        </div>


    )
}