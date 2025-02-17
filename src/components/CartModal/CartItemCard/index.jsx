import { MdDelete } from "react-icons/md";
import styles from "./cartitem.module.scss";

export const CartItemCard = ({ product, removeFromCart }) => {
  return (
    <li className={styles.cartItem}>
      <div  className={styles.imgAndText}>
        <img src={product.img} alt={product.name} />
        <div>
          <h3>{product.name}</h3>
          <span>{`R$ ${parseFloat(product.price).toFixed(2)}`}</span>
        </div>
      </div>
      <button
        onClick={() => removeFromCart(product)}
        aria-label="delete"
        title="Remover item"
      >
        <MdDelete size={21} />
      </button>
    </li>
  );
};
