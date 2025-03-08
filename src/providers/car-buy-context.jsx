import { createContext, useState } from "react";

 export const BuyContext = createContext();

export function BuyProvider({ children }) {
   // Estado inicial del carrito (se obtiene de sessionStorage)
   const [carrito, setCarrito] = useState(() => {
    const savedCart = sessionStorage.getItem("carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  return (
    <BuyContext
      value={{
        carrito, setCarrito
      }}
    >
      {children}
    </BuyContext>
  );
}