import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import Message from "./components/layout/Message";

import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import Profile from './components/pages/User/Profile';
import AddProduct from "./components/pages/Product/AddProduct";
import MyProducts from './components/pages/Product/MyProducts';
import EditProduct from "./components/pages/Product/EditProduct";
import ProductDetails from "./components/pages/Product/ProductDetails";

import {UserProvider} from './context/UserContext';

function App() {
    return (
        <Router>
            <UserProvider>
                <Navbar />
                <Message />
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/user/profile" element={<Profile />} />
                        <Route path="/products/myProducts" element={<MyProducts />} />
                        <Route path="/products/add" element={<AddProduct />} />
                        <Route path="/products/edit/:id" element={<EditProduct />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                    </Routes>
                </Container>
                <Footer />
            </UserProvider>
        </Router>
    );
}

export default App;
