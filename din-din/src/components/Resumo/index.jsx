import {useEffect, useState} from "react";
import "./styles.css";



export default function Resumo({listaTransacoes, handleModal}) {

    const [entrada, setEntrada] = useState(0);
    const [saida, setSaida] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let totalSaida = 0;
        let totalEntrada = 0;

        for (const transacao of listaTransacoes) {
            const valorSemSimbolo = transacao.valor.replace('R$', '').trim();
            let valorNumerico = valorSemSimbolo.replace(',', '.');

            if (transacao.inputOrOutput) {
                totalEntrada += Number(valorNumerico);
            } else {
                totalSaida += Number(valorNumerico);
            }
        }

        setSaida(totalSaida.toLocaleString('pt-BR', {minimumFractionDigits: 2}))
        setEntrada(totalEntrada.toLocaleString('pt-BR', {minimumFractionDigits: 2}))
        setTotal((totalEntrada - totalSaida).toLocaleString('pt-BR', {minimumFractionDigits: 2}))

    }, [listaTransacoes])




    return (
        <div className="container-resumo">
            <div className='resumo'>
                <h1>Resumo</h1>

                <div>
                    <div className='lucro'>
                        <h2>entradas</h2>
                        <span>R$ {entrada} </span>
                    </div>
                    <div className='gasto'>
                        <h2>saídas</h2>
                        <span>R$ {saida}</span>
                    </div>
                </div>

                <div className='saldo'>
                    <h2>saldo</h2>
                    <span>R$ {total}</span>
                </div>


            </div>
            <button
                onClick={() => handleModal(false)}
                className='btn-resumo'>
                Adicionar Registro</button>
        </div>

    )
}