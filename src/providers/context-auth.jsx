import { createContext, useState } from "react";

 export const ClientContext = createContext();

export function ClientProvider({ children }) {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [openModalProduct, setOpenModalProduct] = useState(false);
  const [productDetail, setproductDetail] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [allCards, setAllCards] = useState([])
  const [tipoModal, setTipoModal] = useState("create");
  const [admin, setAdmin] = useState('0');
  const [infoEnca, setInfoEnca] = useState([])
    const [infoDetail, setInfoDetail] = useState([])

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

  //contexto para loguear a usuarios clientes
  // Estado inicial del carrito (se obtiene de sessionStorage)
  const [userClientInfo, setUserClientInfo] = useState(() => {
    const savedClient = sessionStorage.getItem("client");
    return savedClient ? JSON.parse(savedClient) : {};
  });

  return (
    <ClientContext
      value={{
        user,
        login,
        loggedIn,
        setAdmin,
        admin,
        setLoggedIn,
        handleOpenModalProduct,
        handleCloseModalProduct,
        openModalProduct,
        productDetail,
        setproductDetail,
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
        setTipoModal,
        userClientInfo, 
        setUserClientInfo,
        infoEnca, setInfoEnca,
        infoDetail, setInfoDetail
      }}
    >
      {children}
    </ClientContext>
  );
}