import { createContext, useState } from "react";
import Swal from "sweetalert2";

 export const BuyContext = createContext();

export function BuyProvider({ children }) {
   // Estado inicial del carrito (se obtiene de sessionStorage)
   const [carrito, setCarrito] = useState(() => {
    const savedCart = sessionStorage.getItem("carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addCarBuy = (card) => {
    return async () => {
       try {
            const response = await fetch(`http://localhost:9090/products/detail/${card.id}`);
            const productDetail = await response.json();
           
            if (response.ok) {
              const availableQuantity = productDetail.cantidad_disponible;
      
              setCarrito((prev) => {
                const existingItem = prev.find((item) => item.id === card.id);
                const currentQuantity = existingItem ? existingItem.quantity : 0;
                const totalQuantity = currentQuantity + 1;
      
                if (totalQuantity > availableQuantity) {
                  Swal.fire({
                    title: "Error",
                    text: `No hay suficientes existencias de ${card.nombre}.`,
                    icon: "error",
                  });
                  return prev; // Detenemos la actualización del estado
                } else {
                  Swal.fire({
                    title: "Éxito",
                    text: `${card.nombre} ha sido agregado al carrito.`,
                    icon: "success",
                  });
                  // Si hay espacio, actualizar cantidad o agregar nuevo producto
                  if (existingItem) {
                    return prev.map((item) =>
                      item.id === card.id ? { ...item, quantity: totalQuantity } : item
                    );
                  } else {
                    return [...prev, { ...card, quantity: 1 }];
                  }
                }
              });
            } else {
              Swal.fire({
                title: "Error",
                text: `No se pudo obtener la información del producto.`,
                icon: "error",
              });
            }
          } catch (error) {
            Swal.fire({
              title: "Error",
              text: `Ocurrió un error al obtener la información del producto.${error}`,
              icon: "error",
            });
          }
    };
  };


  return (
    <BuyContext
      value={{
        carrito, setCarrito,addCarBuy
      }}
    >
      {children}
    </BuyContext>
  );
}