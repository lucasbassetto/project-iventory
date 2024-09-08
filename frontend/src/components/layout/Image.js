import styles from './Image.module.css';

function Image({ src, alt, width }) {
    return (
        <img className={`${styles.image_factory}`}
             src={src}
             alt={alt}
        />
    )
}

export default Image;