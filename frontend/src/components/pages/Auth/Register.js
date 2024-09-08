import Input from '../../form/input';
import { Link } from 'react-router-dom';
import {useContext, useState} from 'react';

import styles from '../../form/Form.module.css';
import { Context } from '../../../context/UserContext';

function Register() {

    const [user, setUser] = useState({});
    const { register } = useContext(Context);
    function handleOnChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        register(user);
    }

    return(
        <section className={styles.form_container}>
            <h1>Register</h1>
            <form onSubmit={handleOnSubmit}>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    handleChange={handleOnChange}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o número do seu telefone"
                    handleChange={handleOnChange}
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    handleChange={handleOnChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleChange={handleOnChange}
                />
                <Input
                    text="Confirmação de senha"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme a sua senha"
                    handleChange={handleOnChange}
                />
                <input type="submit" value="Cadastrar" />
            </form>
            <p>
                Já possui uma conta? <Link to={'/login'}>Faça o login</Link>
            </p>
        </section>
    );
}

export default Register;