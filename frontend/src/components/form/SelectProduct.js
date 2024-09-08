import styles from './SelectProduct.module.css';

function SelectProduct({text, name, options, handleChange, value}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handleChange} value={value || ''}>
                <option value="">Selecione</option>
                {options.map((productType) => (
                    <option value={productType} key={productType}>{productType}</option>
                ))}
            </select>
        </div>

    )
}

export default SelectProduct;