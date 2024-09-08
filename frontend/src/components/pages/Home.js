import api from '../../utils/api';

import {useState, useEffect} from 'react';

import {Link} from 'react-router-dom';

import styles from './Home.module.css';

function Home() {
    const[products, setProducts] = useState([]);

    useEffect(() => {
        api.get('/products').then(response => {
            setProducts(response.data.products);
        });
    }, []);

    return(
        <section>
            <div className={styles.product_home_header}>
                <h1>Home</h1>
            </div>
            <div className={styles.product_home_container}>
                {products.length > 0 &&
                    products.map(product => (
                        <div className={styles.product_card}>
                            <div style={{backgroundImage: `url(${process.env.REACT_APP_API}/img/products/${product.images[0]})`}} className={styles.product_card_img}></div>
                            <h3>{product.name}</h3>
                            <p>
                                <span className="bold">Título:</span> {product.name}
                            </p>
                            <Link to={`product/${product._id}`}>Mais detalhes</Link>
                        </div>
                    ))}
                {products.length === 0 && (
                    <p>Não tem Produto</p>
                )}
            </div>
        </section>
    );
}

export default Home;