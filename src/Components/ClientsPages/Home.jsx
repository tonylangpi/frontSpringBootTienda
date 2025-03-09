import useFetchData from "../../hooks/useSWR";
import { use, useEffect } from "react";
import { ClientContext } from "../../providers/context-auth";
import { BuyContext } from "../../providers/car-buy-context";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const {
    itemsPerPage,
    handleItemsPerPageChange,
    currentPage,
    currentCards,
    setAllCards,
    totalPages,
    handlePageChange
  } = use(ClientContext);
  
  const { addCarBuy } = use(BuyContext);
    const {
      userClientInfo
    } = use(ClientContext);
  
 // Guardar el userClientInfo en sessionStorage cada vez que cambie
 useEffect(() => {
  sessionStorage.setItem("client", JSON.stringify(userClientInfo));
}, [userClientInfo]);

  const oferts = useFetchData("/products/all");

  useEffect(() => {
      if (!oferts?.isLoading && oferts?.data) {
        setAllCards(oferts?.data || []);
      } else {
        setAllCards([]);
      }
  }, [oferts?.data, oferts?.isLoading, setAllCards]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {userClientInfo && Object.keys(userClientInfo).length === 0 ? (
        <button
          onClick={() => {Swal.fire("Iniciar Sesión", "Por favor, inicie sesión para ver los productos.", "info")
            navigate("/loginClient")
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Iniciar Sesión
        </button>
      ) : (
        <>
          <h1 className="text-bold mb-6">Productos Disponibles</h1>
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
          {oferts?.isLoading ? (
            <div className="flex justify-center items-center w-full py-6">
              <div className="animate-spin rounded-full border-t-4 border-blue-500 w-12 h-12"></div>
              <span className="ml-4 text-gray-600">Cargando...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mb-6">
              {currentCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-yellow-300 hover:bg-green-200 cursor-pointer p-6 rounded-lg shadow-lg"
                >
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img
                      src={`${card.imagen}`}
                      alt={"oferta imagen"}
                      className="w-full h-40 object-cover rounded-lg transition-transform duration-300 transform hover:scale-110"
                    />
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    <p>Nombre: {card.nombre}</p>
                    <p>Descripcion: {card.descripcion}</p>
                    <p>Precio: Q. {card.precio_unitario.toLocaleString()}</p>
                    <p>
                      Estado:{" "}
                      <span
                        className={`font-bold ${
                          card.estado === true ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {card.estado === true ? "Disponible" : "No disponible"}
                      </span>
                    </p>
                  </div>
                  <Box sx={{ flexGrow: 0 }}>
                    {card.estado === true ? (
                      <Tooltip title="Agregar al carrito">
                        <IconButton onClick={addCarBuy(card)} sx={{ p: 3 }}>
                          <AddShoppingCartIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <p className="text-red-500">Producto no disponible</p>
                    )}
                  </Box>
                </div>
              ))}
            </div>
          )}
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
        </>
      )}
    </div>
  );
};

export default Home;
