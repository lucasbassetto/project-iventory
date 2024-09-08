import api from "../../../utils/api";

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import styles from './ProductDetails.module.css';

import useMessage from '../../../hooks/useMessage.js';
function ProductDetails() {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const { showMessage } = useMessage();

    const [token] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        api.get(`/products/${id}`).then((response) => {
            setProduct(response.data.product);
        })
    }, [id]);

    return(
        <>
            {product.name && (
                <section className={styles.product_details__container}>
                    <div>
                        <h1>Mais sobre o produto: {product.name}</h1>
                    </div>
                    <div className={styles.product_img}>
                        {product.images.map((image, index) => (
                            <img key={index} src={`${process.env.REACT_APP_API}/img/products/${product.images}`}
                                 alt={product.name}
                            />
                        ))}
                    </div>
                    <p>
                        <span className="bold">Nome:</span> {product.name}
                    </p>
                    <p>
                        <span className="bold">Descrição:</span> {product.description}
                    </p>
                    <p>
                        <span className="bold">Tipo:</span> {product.productType}
                    </p>
                </section>
            )}
        </>
    );
}

export default ProductDetails;