import { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import InventoryIcon from '@mui/icons-material/Inventory';
import SearchIcon from '@mui/icons-material/Search';

import styles from './Navbar.module.css';

import { Context } from '../../context/UserContext';
const Navbar = () => {

    const { authenticating, logout } = useContext(Context);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();


    };

    return (
        <nav className={styles.navbar}>
            <h2>
                <Link to="/"><InventoryIcon fontSize="large"/> Sistema de Estoque</Link>
            </h2>
            <ul>
                {authenticating ? (
                    <>
                        <li>
                            <Link to="/products/myProducts">Meus Produtos</Link>
                        </li>
                        <li>
                            <Link to="/user/profile">Profile</Link>
                        </li>
                        <li onClick={logout}>Logout</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Cadastrar</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;