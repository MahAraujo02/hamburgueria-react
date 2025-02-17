import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import styles from "./cartmodal.module.scss";
import { useOutClick } from "../../hooks/useOutClick";

export const CartModal = ({
  cartList,
  removeFromCart,
  removeAllFromCart,
  setIsOpen,
}) => {
  const total =
    cartList?.reduce((prevValue, product) => prevValue + product.price, 0) || 0;

  const modalRef = useOutClick(() => {
    setIsOpen(false);
  });

  return (
    <div className={styles.overlayModal}>
      <div
        role="dialog"
        aria-hidden={cartList.length === 0}
        ref={modalRef}
        className={styles.modalContainer}
      >
        <div className={styles.titleAndClose}>
          <h2>Carrinho de compras</h2>
          <button 
            onClick={() => setIsOpen(false)}
            aria-label="Fechar"
            title="Fechar"
          >
            <MdClose size={21} />
          </button>
        </div>

        {/* Lista de produtos no carrinho */}
        <div className={styles.listCart}>
          <ul>
            {cartList.length > 0 ? (
              cartList.map((product) => (
                <CartItemCard
                  key={product.id}
                  product={product}
                  removeFromCart={removeFromCart}
                />
              ))
            ) : (
              <p>Adicione itens ao carrinho</p>
            )}
          </ul>
        </div>

        {/* Total e botão para remover tudo */}
        <div className={styles.totalAndRemove}>
          <div>
            <span className={styles.totalText}>Total</span>
            <span className={styles.totalValue}>
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <button onClick={removeAllFromCart} disabled={cartList.length === 0}>
            Remover todos
          </button>
        </div>
      </div>
    </div>
  );
};
