import { useState } from 'react';
import './styles.css';


    export default function Filter () {
        const filtros= ['Contas', 'Depósito', 'Lazer', 'Mercado', 'TED', 'Compras', 'Farmárcia', 'Pix']
        const [changeStatus, setChangeStatus] = useState(Array(filtros.length).fill(false));

        const toggleStatus = (index) => {
            const newStatus = [...changeStatus];
            newStatus[index] = !newStatus[index];
            setChangeStatus(newStatus);
          };
        
        return (
            <div className='container-filter'>
                <h3 className='categoria-filter'> Categoria </h3>
                <div className='filters'>
                    {filtros.map((filtro, index) => (
                        <div 
                            key={index}  
                            className={changeStatus[index] ? 'filter-box blue' : 'filter-box white'}
                            onClick={() => toggleStatus(index)}
                        >
                            {filtro} {changeStatus[index] ? <span>x</span> : <span>+</span>}
                        </div>
                    ))}
                </div>
                <div className='buttons-filter'>
                    <button>Limpar Filtros</button>
                    <button>Aplicar Filtros</button>
                </div>
            </div>
        )
    }