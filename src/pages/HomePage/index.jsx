import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { api } from "../../services/api";
import styles from "./main.module.scss"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const HomePage = () => {
  const localStorageCart = localStorage.getItem("cartList");
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState(JSON.parse(localStorageCart) || []);
  const [loading, setLoading] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([])


  useEffect(() => {
    const respose = async () => {
      setLoading(true);
      try {
        const {data} = await api.get("/products")
        setAllProducts(data);
        setProductList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    respose();



  }, []);


  
  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  const addToCart = (card) => {
    const findCard = cartList.find((product) => product.id === card.id);

    if (!findCard) {
      setCartList([...cartList, card]);
    } else {
      toast.warning("Item já adicionado ao carrinho!", {
        position: "bottom-right",

      });
    }
  };

  const removeFromCart = (card) => {
    const filteredCart = cartList.filter((product) => product.id !== card.id);
    setCartList(filteredCart);
  };
  const removeAllFromCart = () => {
    setCartList([]);
  };
  const filterSearch = (value) => {
    if (value.trim() === "") {
      setProductList(allProducts)
    }else {
      const filteredList = allProducts.filter((card) =>
        card.name.toLowerCase().includes(value.toLowerCase())
      );
      setProductList(filteredList)
    }
  };

  return (
    <>

    <ToastContainer/>
      <Header
        cartListCount={cartList.length}
        setIsOpen={setIsCartModalOpen}
        filterSearch={filterSearch}
      />

      <main className={styles.main}>
      {loading ? (
          <p>Carregando...</p>
        ) : (
          <ProductList productList={productList} addToCart={addToCart} />
        )}
        {isCartModalOpen && (
          <CartModal
            cartList={cartList}
            removeFromCart={removeFromCart}
            removeAllFromCart={removeAllFromCart}
            setIsOpen={setIsCartModalOpen}
          />
        ) }
      </main>
    </>
  );
};
