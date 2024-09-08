import api from '../../../utils/api';

import { useState, useEffect } from 'react'
    ;
import styles from './Profile.module.css'
import formStyles from '../../form/Form.module.css';

import Input from '../../form/input.js';
import Image from '../../layout/Image.js';

import useMessage from '../../../hooks/useMessage.js';
function Profile() {

    const[user, setUser] = useState({});
    const[preview, setPreview] = useState();
    const[token] = useState(localStorage.getItem('token') || '');
    const { message } = useMessage();

    useEffect(() => {
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(response => {
            setUser(response.data);
        })
    }, [token])

    function onFileChange(e){
        setPreview(e.target.files[0]);
        setUser({
            ...user,
            [e.target.name]: e.target.files[0]
        });

    }
    function handleChange(e){
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        let msg = 'Profile edited successfully.'
        let type = 'success'

        const formData = new FormData();

        await Object.keys(user).forEach((key) => formData.append(key, user[key]),
            );

        const data = await api.patch(`/users/edit/${user._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            },
        }).then((response) => {
            return response.data;
        })
        .catch((error) => {
            type = 'error'
            msg =  error.response.data.message
        })
        message(msg, type);
    }

    return (
        <section>
            <div className={styles.profile_header}>
                <h1>Profile</h1>
                {(user.image || preview) &&(
                    <Image src={preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}/img/user/${user.image}`
                    }
                    alt={user.name}
                    />
                )}
            </div>
            <form onSubmit={handleSubmit} className={formStyles.form_container}>
                <Input
                    text="Imagem"
                    type="file"
                    name="image"
                    handleChange={onFileChange}
                />
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleChange={handleChange}
                    value={user.name || ''}
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleChange={handleChange}
                    value={user.email || ''}
                />
                <Input
                    text="Telefone"
                    type="tel"
                    name="phone"
                    placeholder="Digite o seu telefone"
                    handleChange={handleChange}
                    value={user.phone || ''}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleChange={handleChange}
                />
                <Input
                    text="Confirme a senha"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme a sua senha"
                    handleChange={handleChange}
                />
                <input type="submit" value="Editar" />
            </form>
        </section>
    );
}

export default Profile;