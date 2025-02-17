import { useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import styles from "./header.module.scss"

export const Header = ({cartListCount, setIsOpen, filterSearch}) => {
   const [value, setValue] = useState("");

   const submit = (e) => {
      e.preventDefault()
      filterSearch(value)
   }

   return (
      <header className={styles.header}>
         <img src={Logo} alt="Logo Kenzie Burguer" />
         <div>
            <button onClick={()=>setIsOpen(true)} className={styles.cartIcon}>
                <MdShoppingCart size={21}/>
                <span>{cartListCount}</span>
            </button>
            <form onSubmit={submit} >
               <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
               />
               <button type="submit">    
                 <MdSearch size={21} />
               </button>
            </form>
         </div>
      </header>
   );

};
