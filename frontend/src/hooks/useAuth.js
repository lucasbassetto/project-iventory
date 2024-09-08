import api from '../utils/api';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMessage from "./useMessage";

export default function useAuth() {
    const [authenticating, setAuthenticating] = useState(false);
    const { message } = useMessage();
    const history = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticating(true)
        }
    }, []);

    async function register(user) {
        let msg = 'Registration successful.'
        let type = 'success'
        try {
            const data = await api.post('/users/register', user)
                .then((response) => {
                    return response.data;
                });
            await authenticationUser(data)
        } catch (error) {
            msg =  error.response.data.message
            type = 'error'
        }

        message(msg, type)
    }

    async function authenticationUser(data) {
        setAuthenticating(true);
        localStorage.setItem('token', JSON.stringify(data.token));
        history('/')
    }
    async function login(user) {
        let msg = 'Login successful.'
        let type = 'success'

        try {
            const data = await api.post('/users/login', user)
                .then((response ) => {
                    return response.data;
                });
            await authenticationUser(data)
        } catch (error) {
            msg = error.response.data.message
            type = 'error'
        }
        message(msg, type)
    }

    function logout() {
        let message1 = 'Logout successful.';
        let type = 'success';

        setAuthenticating(false);
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined
        history('/')
        message(message1, type);
    }

    return { authenticating, register, logout, login};
}