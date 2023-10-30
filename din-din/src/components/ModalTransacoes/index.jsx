    import { useEffect, useState } from "react";
    import "./styles.css";


    export default function ModalTransacoes ( { handleModal, modalOpen, setListaTransacoes, listaTransacoes, setError, error, editTransacoes, formTransacao, setFormTransacao, setHadleInput, handleInput } ) {
        
        const [ inputOrOutput, setInputOrOutput ] = useState( true );
        const [transacoesId, setTrasacoesId] = useState(
            JSON.parse(localStorage.getItem('idTransacao')) || 1
        );

        useEffect( () => {
            if ( handleInput ) {
                setInputOrOutput( true );
            } else {
                setInputOrOutput( false );
            }
        }, [ handleInput ] )

        useEffect( () => {
            localStorage.setItem('idTransacao', JSON.stringify(transacoesId)) 
        }, [transacoesId] )
    
        function inputMaxDate() {
            const data = new Date();
            const ano = data.getFullYear();
            const mes = (data.getMonth() + 1).toString().padStart(2, '0');
            const dia = data.getDate().toString().padStart(2, '0');
            return `${ano}-${mes}-${dia}`;
        }

        function formatarMoeda  (e)  {
            let input = event.target.value.replace(/\D/g, '');
            input = (input / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
            setFormTransacao({ ...formTransacao, [ e.target.name ]: 'R$ ' + input });
          };
        
        function handleChangeForm ( e ) {
            const value = e.target.value;
                setFormTransacao( { ...formTransacao, [ e.target.name ]: value } );
        }
        
        async function handleClick () {
            const valor = formTransacao.valor
            const categoria = formTransacao.categoria   
            let descricao = ''
            if(formTransacao.descricao) {
                descricao = formTransacao.descricao
            }else {
                descricao = '-'
            }
            
            
            let data = new Date(formTransacao.data)
            data = new Date (+data + (1000*60*60*3))
            const ano = data.getFullYear()
            const mes = (data.getMonth() + 1).toString().padStart(2, '0')
            const dia = ( data.getDate() ).toString().padStart(2, '0')
            const dataFormatada = `${ dia }/${ mes }/${ ano }`
            const semana = [ 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo' ]
            const diaSemana = semana[ data.getDay() ]
        

            
            if ( !valor || isNaN(data) || !categoria ) {
                setError( 'Preencha os campos de Valor, Data e Categoria' )
            }
            else if (valor <= 0){
                setError( 'O campo Valor deve ser maior que 0' )
            }
            else {
                if(!editTransacoes){
                    if ( listaTransacoes.length > 0 ) { 
                        setListaTransacoes(
                            [ ...listaTransacoes, {
                                valor,
                                categoria,
                                data: dataFormatada,
                                diaSemana,
                                descricao,
                                inputOrOutput,
                                id:transacoesId
                            } ] )
                    }
                    else {
                        setListaTransacoes(
                            [ {
                                valor,
                                categoria,
                                data: dataFormatada,
                                diaSemana,
                                descricao,
                                inputOrOutput,
                                id:transacoesId
                            } ] 
                        )
                    }
                    setTrasacoesId(transacoesId + 1);
                    setError( '' )
                    setFormTransacao( {  
                        valor: '',       
                        categoria: '',   
                        data: '',        
                        descricao: ''   });
                    handleModal()
                }                    
                else{
                    const indiceTransacaoEditada = listaTransacoes.findIndex((transacao) => {
                        return Number(transacao.id) === Number(formTransacao.id)
                    }
                    );
                    if (indiceTransacaoEditada !== -1) {
                        const transacaoEditada = {
                            valor,
                            categoria,
                            data: dataFormatada,
                            diaSemana,
                            descricao,
                            inputOrOutput,
                            id: formTransacao.id, 
                        };
        
                        const novaListaTransacoes = [...listaTransacoes];
                        novaListaTransacoes[indiceTransacaoEditada] = transacaoEditada;
        
                        setListaTransacoes(novaListaTransacoes);
                        setError('');
                        setFormTransacao( {  
                            valor: '',       
                            categoria: '',   
                            data: '',        
                            descricao: ''   });
                        handleModal();
                    }
                }   
            }
        }       
                    
                    
            function handleClickInput () {
            setHadleInput( true );
        }
        
        function handleClickOutput () {
            setHadleInput( false );
        }
        
        
        return (
            <>
                {modalOpen && (
                    <div className="background">

                        <div className="modal">

                            <div className="add-registro">
                            {editTransacoes ?
                                <h1>Editar Registro</h1> :
                                <h1>Adicionar Registro</h1>
                            }
                                <button
                                    className='btn-cancelar'
                                    onClick={() => handleModal(false)}>
                                    X</button>
                            </div>

                            <div className="entrada-saida">
                                <button
                                    className={handleInput ? "btn-entrada entrada" : "btn-entrada"}
                                    onClick={handleClickInput}
                                >Entrada</button>

                                <button
                                    className={!handleInput ? "btn-saida saida" : "btn-saida"}
                                    onClick={handleClickOutput}
                                >Saída</button>

                            </div>

                            <div className="cadastrar-transacao">
                                <div className="valor">
                                    <h1>Valor</h1>
                                    <input
                                className='valor-input'
                                type='text'
                                value={formTransacao.valor}
                                placeholder='Digite o valor'
                                name="valor"
                                min='0'
                                onChange={(e) => formatarMoeda(e)}
                            />
                            </div>

                                <div className="categoria">
                                    <h1>Categoria</h1>
                                    <select
                                        name="categoria"
                                        className="select"
                                        value={formTransacao.categoria}
                                        onChange={(e) => handleChangeForm(e)}
                                    >
                                        <option value="">--Escolha uma opção--</option>
                                        <option value="alimentacao">Alimentação</option>
                                        <option value="servicos">Assinatura e Serviços</option>
                                        <option value="casa">Casa</option>
                                        <option value="compras">Compras</option>
                                        <option value="cuidados">Cuidados Pessoais</option>
                                        <option value="educacao">Educação</option>
                                    </select>
                                </div>

                                <div className="data">
                                    <h1>Data</h1>
                                    <input
                                        name="data"
                                        className="date"
                                        value={formTransacao.data}
                                        type='date'
                                        max={inputMaxDate()}
                                        onChange={(e) => handleChangeForm(e)}
                                    />
                                </div>

                                <div className="descricao">
                                    <h1>Descrição</h1>
                                    <input
                                        type='text'
                                        name='descricao'
                                        value={formTransacao.descricao}
                                        className="descricao-input"
                                        placeholder='Digite uma descrição'
                                        onChange={(e) => handleChangeForm(e)}
                                    />
                                </div>
                            </div>

                            <div className="container-btn-transacao">
                                <button
                                    className='btn-confirmar'
                                    onClick={() => handleClick()}
                                >Confirmar</button>

                                {error && <span className='error'>{error}</span>}
                            </div>


                        </div>

                    </div>
                )}
            </>

        )
    }


