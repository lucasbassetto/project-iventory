import {useState} from "react";

import formStyles from './Form.module.css';

import Input from "./input";
import SelectProduct from "./SelectProduct";

function ProductForm({ handleSubmit, productData, btnText }) {

    const [product, setProduct] = useState(productData || {});
    const [preview, setPreview] = useState([]);
    const productType = ['Eletrônicos', 'Livros', 'Filmes', 'Jogos', 'Roupas', 'Eletrodomésticos', 'Outros'];

    function onFileChange(e) {
        setPreview(Array.from(e.target.files));
        setProduct({...product, images: [...e.target.files]});
    }

    function handleChange(e) {
        setProduct({...product, [e.target.name]: e.target.value});
    }

    function handleGenre(e) {
        setProduct({...product, productType: e.target.options[e.target.selectedIndex].text});
    }

    function submit(e) {
        e.preventDefault();
        handleSubmit(product);
    }

    return(
        <form onSubmit={submit} className={formStyles.form_container}>
            <div className={formStyles.preview_product_images}>
                {preview.length > 0
                    ? preview.map((img, index) =>
                        <img src={URL.createObjectURL(img)} alt={product.name} key={`${product.name}+${index}`}
                        />
                    )
                    : product.images && product.images.map((img, index) =>
                    <img src={`${process.env.REACT_APP_API}/img/products/${img}`}
                         alt={product.name}
                         key={`${product.name}+${index}`}
                    />)}
            </div>
            <Input
                text="Imagens do produto"
                type="file"
                name="images"
                handleChange={onFileChange}
                multiple={true}
            />
            <Input
                text="Nome do produto"
                type="text"
                name="name"
                placeholder="Digite o nome do produto"
                handleChange={handleChange}
                value={product.name || ''}
            />
            <Input
                text="Descrição do Produto"
                type="text"
                name="description"
                placeholder="Digite a descrição do produto"
                handleChange={handleChange}
                value={product.description || ''}
            />
            <SelectProduct
                name="productType"
                text="Selecione o tipo do produto"
                options={productType}
                handleChange={handleGenre}
                value={product.productType || ''}
            />
            <input type="submit" value={btnText}/>
        </form>
    );
}

export default ProductForm;