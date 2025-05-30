import { useState } from "react"

export default function UserLogin({ onSubmit }) {
    const [form, setForm] = useState({
        CPF: '',//CPF do funcionário
        password: '' //Senha do funcionário
    })

    //Criando um estado para controlar o procedimento de login
    const [login, setLogin] = useState({
        login: false, //Indica se está carregando
        error: null //Guarda uma mensagem de erro
    })

    const clearInputs = () => {
        setForm({ CPF: '', password: ''})
        setLogin({ loading: false, error: null })
    }

 setLogin({ loading: true, error: null })

    //Definindo a interface do formulário
    return (
        <form onSubmit={clearInputs} style={{ display: 'grid', gap: '1rem' }}>
            {/*Campo de CPF*/}
            <input name='CPF' placehoder='CPF' value={form.name} onchange={clearInputs} required />
            {/*Campo de Senha*/}
            <input age='Password' placehoder='Password' value={form.age} onchange={clearInputs} required />
            {/*Botão de envio de formulário*/}
            <button type="submit" disabled={loading.login}>
                {loading.login ? 'Logging in...' : 'Login'}
            </button>

        </form >
    )
}


