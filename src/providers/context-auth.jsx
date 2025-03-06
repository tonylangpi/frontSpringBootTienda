"use client"
import { createContext, useState } from "react";

 export const ClientContext = createContext();

export function ClientProvider({ children }) {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);
  const [openModalProduct, setOpenModalProduct] = useState(false);
  const [creditDetail, setCreditDetail] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [allCards, setAllCards] = useState([])
  const [tipoModal, setTipoModal] = useState("create");

    const handleOpenModalProduct = () => {
      setOpenModalProduct(true)
      //setCreditDetail(credit)
    }
    const handleCloseModalProduct = () => setOpenModalProduct(false);

     //calcular el monto de paginas
     const totalPages = Math.ceil(allCards.length / itemsPerPage);

     // Controla el cambio de página
   const handlePageChange = (page) => {
     setCurrentPage(page);
   };
 
   // Controla el cambio en la cantidad de elementos por página
   const handleItemsPerPageChange = (event) => {
     setItemsPerPage(Number(event.target.value));
     setCurrentPage(1); // Reseteamos a la primera página si se cambia el número de elementos
   };
 
   // Obtener las tarjetas que deben mostrarse según la página actual
   const currentCards = allCards.slice(
     (currentPage - 1) * itemsPerPage,
     currentPage * itemsPerPage
   );

  function login(user) {
    setUser(user);
  }

  return (
    <ClientContext
      value={{
        user,
        login,
        loggedIn,
        setLoggedIn,
        handleOpenModalProduct,
        handleCloseModalProduct,
        openModalProduct,
        creditDetail,
        setCreditDetail,
        allCards,
        setAllCards,
        itemsPerPage,
        setItemsPerPage,
        currentPage,
        setCurrentPage,
        totalPages,
        handlePageChange,
        handleItemsPerPageChange,
        currentCards,
        tipoModal, 
        setTipoModal
      }}
    >
      {children}
    </ClientContext>
  );
}