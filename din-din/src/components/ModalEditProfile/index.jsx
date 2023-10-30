import { useState } from "react";
import "./styles.css";

export default function ModalEditProfile({ handleModalEditProfile, openModalEditProfile, setOpenModalEditProfile, user }) {
    const users = JSON.parse(localStorage.getItem('users'))
    const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    password: '',
    checkPassword: ''
  });
  const [error, setError] = useState('');

  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const isEmailAlreadyExists = (email) => {
    return users.some((user) => user.email === email);
  };

  function handleChangeForm(e) {
    const value = e.target.value;
    setForm({ ...form, [e.target.name]: value });
  }

  function handleSubmit ( e ) {
    e.preventDefault();

    setError( '' );


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
        const updatedUsers = users.map((update) => (update.id === user.id ? form : update));
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        handleModalEditProfile()
        setError( '' )
        setForm({
            name: user.name,
            email: user.email,
            password: '',
            checkPassword: ''
        })
    }

}
  return (
    <>
      {openModalEditProfile && (
        <div className="background">
          <form onSubmit={handleSubmit}>
            <div className="modal-editProfile">
              <div className="edit-profile">
                <h1>Editar Perfil</h1>
                <button
                  className='close-btn'
                  onClick={handleModalEditProfile}
                >
                  X
                </button>
              </div>
              <div>
                <p>Nome</p>
                <input
                  type="text"
                  placeholder='Digite seu nome'
                  value={form.name}
                  name='name'
                  onChange={(e) => handleChangeForm(e)}
                />
              </div>
              <div>
                <p>E-mail</p>
                <input
                  type="text"
                  placeholder='Digite seu E-mail'
                  value={form.email}
                  name='email'
                  onChange={(e) => handleChangeForm(e)}
                />
              </div>
              <div>
                <p>Senha</p>
                <input
                  type="password"
                  placeholder='Digite sua senha'
                  value={form.password}
                  name='password'
                  onChange={(e) => handleChangeForm(e)}
                />
              </div>
              <div>
                <p>Confirmação de senha</p>
                <input
                  type="password"
                  placeholder='Digite sua senha novamente'
                  value={form.checkPassword}
                  name='checkPassword'
                  onChange={(e) => handleChangeForm(e)}
                />
              </div>
              <div className='container-btn' >
                <button type='submit' className="btn-confirm">Confirmar </button>
                {error && <span className='error'>{error}</span>}
              </div>
            </div>
          </form>   
        </div>
      )}
    </>
  )
}