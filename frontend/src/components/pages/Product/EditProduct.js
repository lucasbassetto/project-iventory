import api from "../../../utils/api";

import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";

import styles from './AddProduct.module.css';
import ProductForm from "../../form/ProductForm";

import useMessage from '../../../hooks/useMessage.js';

function EditProduct() {

    const[product, setProduct] = useState({});
    const[token] = useState(localStorage.getItem('token') || '');
    const {id} = useParams();
    const {message} = useMessage();

    useEffect(() => {
        api.get(`/products/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        }).then(response => {
            setProduct(response.data.product);
        })
    }, [token, id])

    async function updateProduct(product) {
        let type = 'success';
        let msg = 'Product updated successfully.';

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

        const data = await api.patch(`/products/${product._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            },
        }).then((response) => {
            return response.data;
        })    .catch((error) => {
            type = 'error'
            msg =  error.response.data.message
        })
        message(msg, type);
    }

    return(
        <section>
            <div className={styles.addproduct_header}>
                <h1>Edit Product</h1>
            </div>
            {product.name && (
                <ProductForm handleSubmit={updateProduct} btnText="Atualizar" productData={product} />
            )}
        </section>
    );
}

export default EditProduct;