import useFetchData from "../../hooks/useSWR";
import {use, useEffect} from "react";
import { ClientContext } from "../../providers/context-auth";
import Modal from "../AdminPages/ModalCreateProduct";
import IconEdit from '@mui/icons-material/Edit';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

const Iventory = () => {
     
    const {
      handleOpenModalProduct, 
      openModalProduct, 
      handleCloseModalProduct, 
      itemsPerPage,
      handleItemsPerPageChange,
      currentPage,
      currentCards,
      setAllCards,
      totalPages,
      handlePageChange,
      user,
      setTipoModal,
      setproductDetail,
    } = use(ClientContext);
    const oferts = useFetchData("/products/all");

    useEffect(() => {
      if (!oferts?.isLoading && oferts?.data) {
        setAllCards(oferts?.data|| []); // Ensure that you handle the case where `data.ofertas` might be undefined
      } else {
        setAllCards([]);  // Optionally set empty if loading or error
      }
     }, [oferts?.data, oferts?.isLoading, setAllCards]);

     const editProduct = (card) => {
        setproductDetail(card);
        setTipoModal("edit");
        handleOpenModalProduct();
      }

  if (user?.isAdmin !== "1") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-red-500">No tienes permisos</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Botón para abrir el modal */}
      <button
        onClick={() => {setTipoModal("create"); handleOpenModalProduct()} }
        className="bg-blue-500 hover:bg-blue-300 cursor-pointer text-white px-6 py-3 rounded-lg mb-6"
      >
        Agregar nuevo Producto
      </button>

      {/* Modal */}
      <Modal isOpen={openModalProduct} onClose={handleCloseModalProduct} mutate={oferts.mutate} />

      {/* Selector para elegir cuántas cards mostrar por página */}
      <div className="mb-4">
        <label htmlFor="itemsPerPage" className="mr-2">
          Mostrar:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value={5}>5 tarjetas</option>
          <option value={10}>10 tarjetas</option>
        </select>
      </div>

      {/* Indicador de carga mientras los datos se están recuperando */}
      {oferts?.isLoading ? (
        <div className="flex justify-center items-center w-full py-6">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 w-12 h-12"></div>
          <span className="ml-4 text-gray-600">Cargando...</span>
        </div>
      ) : (
        // Grilla de tarjetas
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mb-6">
          {currentCards.map((card, index) => (
            <div key={index} className="bg-yellow-300 hover:bg-green-200 cursor-pointer p-6 rounded-lg shadow-lg">
              {/* Imagen de la oferta */}
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src={`${card.imagen}`}
                  alt={"oferta imagen"}
                  className="w-full h-40 object-cover rounded-lg transition-transform duration-300 transform hover:scale-110"
                />
              </div>
              <div className="text-sm text-gray-500 mt-2">
                <p>nombre: {card.nombre}</p>
                <p>Descripcion: {card.descripcion}</p>
                <p>Descripcion: {card.precio_unitario}</p>
                <p>Descripcion: {card.cantidad_disponible}</p>
                <p>Estado: <span className={`font-bold ${card.estado === true ? "text-green-500" : "text-red-500"}`}>{card.estado === true ? "Disponible" : "No disponible"}</span></p>
              </div>

              {/* Botones de acción */}
              <div className="mt-4 flex justify-between space-x-2">
                <button
                  onClick={() => {editProduct(card)}}
                  className="bg-yellow-500 hover:bg-amber-200 cursor-pointer text-white px-4 py-2 rounded-lg"
                >
                  <IconEdit stroke={2} />
                  Editar
                </button>
                <button
                  onClick={() => alert(card.id)}
                  className="bg-red-500 hover:bg-red-300 cursor-pointer text-white px-4 py-2 rounded-lg"
                >
                  <ToggleOnIcon stroke={2} />
                  Inactivar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginado */}
      {!oferts?.isLoading && (
        <div className="flex justify-between w-full max-w-4xl">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
          >
            Anterior
          </button>
          <div className="flex items-center space-x-2">
            <span>
              Página {currentPage} de {totalPages}
            </span>
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default Iventory