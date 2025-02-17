import styles from "./producticard.module.scss";

export const ProductCard = ({ product, addToCart }) => {
    return(
        <li className={styles.cardContainer}>
            <img src={product.img} alt={product.name} />
            <div>
                <h3>{product.name}</h3>
                <span className={styles.productCategory}>{product.category}</span>
                <span className={styles.productPrice}>{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})}</span>
                <button onClick={()=>addToCart(product)} >Adicionar</button>
            </div>
        </li>
    )
}