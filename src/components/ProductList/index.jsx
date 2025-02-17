import styles from "./productlist.module.scss"
import { ProductCard } from "./ProductCard";

export const ProductList = ({ productList, addToCart }) => {
   return (
      <ul className={styles.productListContainer}>
         {productList.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
         ))}
      </ul>
   );
};
