import api from '../../../utils/api';

import styles from './AddProduct.module.css';

import { useState } from 'react';
import {useNavigate} from "react-router-dom";

import useMessage from '../../../hooks/useMessage.js';

import ProductForm from '../../form/ProductForm';

function AddProduct() {
    const[token] = useState(localStorage.getItem('token') || '');
    const { message } = useMessage();
    const navigate = useNavigate();

    async function registerProduct(product) {
        let msg = 'Product registered successfully.'
        let type = 'success'

        const formData = new FormData();

        await Object.keys(product).forEach(key => {
            if (key === 'images') {
                for(let i = 0; i < product[key].length; i++) {
                    formData.append('images', product[key][i]);
                }
            } else {
                formData.append(key, product[key]);
            }
        });

        const data = await api.post('/products/save', formData, {
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

        if(type !== 'error') navigate('/products/myProducts');
    }

    return (
        <section className={styles.addproduct_header}>
            <div>
                <h1>Cadastre um produto</h1>
            </div>
            <p>form</p>
            <ProductForm handleSubmit={registerProduct} btnText="Cadastrar produto" />
        </section>
    );
}

export default AddProduct;