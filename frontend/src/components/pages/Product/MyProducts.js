import { useState, useEffect} from "react";

import { Link } from "react-router-dom";
import Image from "../../layout/Image";
import useMessage from '../../../hooks/useMessage.js';
import styles from './Dash.module.css';
import api from "../../../utils/api";

function MyProducts() {

    const [products, setProducts] = useState([]);

    const [token]= useState(localStorage.getItem('token') || '');

    const { message } = useMessage();

    useEffect(() => {

        api.get('/products/myProducts', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        }).then(response => {
            setProducts(response.data.products);
        })
    }, [token])

    async function removeProduct(id) {
        let msg = 'Product removed successfully.'
        let type = 'success'

        const data = await api.delete(`/products/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        }).then((response) => {
            const updateProducts = products.filter((product) => product._id !== id)
            setProducts(updateProducts)
            return response.data
        })
            .catch((erro) => {
                type = 'error'
                msg =  erro.response.data.message

                return erro.response.data
            })
        message(msg, type);
    }

    return (
        <section>
            <div className={styles.productlist_header}>
                <h1>Meus Produtos</h1>
                <Link to="/products/add">Cadastrar produto</Link>
            </div>
            <div className={styles.productlist_container}>
                {products.length > 0 &&
                    products.map((product) =>(
                        <div className={styles.productlist_row} key={product._id}>
                            <Image
                                src={`${process.env.REACT_APP_API}img/products/${product.images[0]}`}
                                alt={product.name} width="70px"
                            />
                            <span>{product.name}</span>
                            <div className={styles.actions}>
                                <Link to={`/products/edit/${product._id}`}>Editar</Link>
                                <button onClick={() =>{
                                    removeProduct(product._id)
                                }}>Excluir</button>
                            </div>
                        </div>
                    ))
                }
                {products.length === 0 && <p>Você ainda não cadastrou nenhum produto</p>}
            </div>

        </section>
    )
}

export default MyProducts;