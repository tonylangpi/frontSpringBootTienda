import { createContext, useState } from "react";
import Swal from "sweetalert2";
import {createDetails, getHeaderFact, gertDetailsFact} from "../services/ventas-enc-service"

 export const BuyContext = createContext();

export function BuyProvider({ children }) {
   // Estado inicial del carrito (se obtiene de sessionStorage)
   const [carrito, setCarrito] = useState(() => {
    const savedCart = sessionStorage.getItem("carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [infoEnca, setInfoEnca] = useState({});
  const [detailInfo, setDetailInfo] = useState({});


  const saveFacturaDetails = async (facturaId) => {
    const facturaDetails = carrito.map((item) => ({
      factura_id: facturaId,
      id_producto: item.id,
      cantidad: item.quantity,
      precio_venta: item.precio_unitario
    }));

    try {
      const response = await createDetails(facturaDetails);
      console.log(response);
        Swal.fire({
          title: "Éxito",
          text: `${response}`,
          icon: "success",
        });
        setCarrito([]);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Ocurrió un error al guardar los detalles de la factura. ${error}`,
        icon: "error",
      });
    }
  };

  const getHeaderFactura = async (facturaId) => {
    try {
      const response = await getHeaderFact(facturaId);
      if(!response){
        Swal.fire({
          title: "Error",
          text: `Ocurrió un error al generar la factura`,
          icon: "error",
        });
        return false;
      }else{
        setInfoEnca(response);
        return true;
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Ocurrió un error al guardar los detalles de la factura. ${error}`,
        icon: "error",
      });
    }
  };

  const getDetailsFactura = async(factId) =>{
    try {
      const response = await gertDetailsFact(factId);
      if(!response){
        Swal.fire({
          title: "Error",
          text: `Ocurrió un error al generar la factura`,
          icon: "error",
        });
        return false;
      }else{
        setDetailInfo(response);
        return true;
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Ocurrió un error al guardar los detalles de la factura. ${error}`,
        icon: "error",
      });
    }
  }

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
        carrito, setCarrito,addCarBuy,saveFacturaDetails,getHeaderFactura, infoEnca,detailInfo, getDetailsFactura
      }}
    >
      {children}
    </BuyContext>
  );
}