// components/Modal.js
import {use} from "react";
import { ClientContext } from "../../providers/context-auth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createProduct } from "../../services/products-services.js"
import InputNombreProd from '../inputs/input.jsx'
import InputDescripcionProd from '../inputs/input.jsx'
import InputPrecioProd from '../inputs/input.jsx'
import InputCantidadProd from '../inputs/input.jsx'
import InputImagenProd from '../inputs/input.jsx'
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from "react-router-dom";

const ModalCreateProduct = ({ isOpen, onClose, mutate }) => {
  const navigate = useNavigate();
  const {
    tipoModal,
  } = use(ClientContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nombre:"",
      descripcion:"",
      precio_unitario:"",
      cantidad_disponible:"",
      imagen:""
    },
  });

  if (!isOpen) return null;
    
      const enviar = handleSubmit(async (product) => {
        //console.log(product);
        // Simulación de envío a la API

        // Mostrar la alerta de carga
        Swal.fire({
          title: "Cargando...",
          text: "Por favor espera mientras se envían los datos.",
          icon: "info",
          allowOutsideClick: false, // No se puede cerrar fuera de la alerta
          didOpen: () => {
            Swal.showLoading(); // Muestra el cargador
          },
        });
    
        // Simulación de envío a la API
        try {
            const res = await createProduct(product)
          console.log(res);
          if (res) {
            navigate("/inventory");
            //Cerrar la alerta de carga y mostrar el mensaje de éxito
            Swal.fire({
              title: "¡Éxito!",
              text: "El producto se ha creado correctamente.",
              icon: "success",
            });
            // Resetear el formulario
            reset();
            mutate();
            // Cerrar el modal
            onClose();
          } else {
            Swal.fire({
              title: "Problema",
              text: "hubo un error al enviar los datos",
              icon: "error",
            });
          }
        } catch (error) {
          // Si hay un error, mostrar alerta de error
          Swal.fire({
            title: "Error",
            text: `Hubo un problema al enviar los datos.${error}`,
            icon: "error",
          });
        }
      });

    // Modal
    // Compare this snippet from src/Components/AdminPages/ModalCreateProduct.jsx:
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-70">
        <div className="bg-white rounded-lg shadow-lg w-120 p-6">
          {tipoModal === "create" ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">Crear Producto</h2>
              <form onSubmit={enviar}  className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                <InputNombreProd
                  type="text"
                  name="nombre"
                  label={"Nombre Producto"}
                  register={{
                    ...register("nombre", {
                      required: {
                        value: true,
                        message: "Campo requerido",
                      }
                    }),
                  }}
                  message={errors?.nombre?.message}
                />
                <InputDescripcionProd
                    type="text"
                    name="descripcion"
                    label={"descripcion producto"}
                    register={{
                        ...register("descripcion", {
                        required: {
                            value: true,
                            message: "Campo requerido",
                        }
                        }),
                    }}
                    message={errors?.descripcion?.message}
                />
                  <InputPrecioProd
                    type="number"
                    name="precio_unitario"
                    label={"precio producto"}
                    register={{
                        ...register("precio_unitario", {
                        required: {
                            value: true,
                            message: "Campo requerido",
                        },
                        pattern: {
                            value: /^[0-9]+(\.[0-9]+)?$/,
                            message: "Solo se permiten números positivos",
                        }
                        }),
                    }}
                    message={errors?.precio_unitario?.message}
                />
                <InputCantidadProd
                    type="number"
                    step="1"
                    name="cantidad_disponible"
                    label={"cantidad producto"}
                    register={{
                        ...register("cantidad_disponible", {
                        required: {
                            value: true,
                            message: "Campo requerido",
                        },
                        pattern: {
                            value: /^[0-9]+(\.[0-9]+)?$/,
                            message: "Solo se permiten números positivos",
                        }
                        }),
                    }}
                    message={errors?.cantidad_disponible?.message}
                />
                <InputImagenProd
                    type="text"
                    name="imagen"
                    label={"url imagen producto"}
                    register={{
                        ...register("imagen", {
                        required: {
                            value: true,
                            message: "Campo requerido",
                        },
                        pattern: {
                            value: /^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/i,
                            message: "URL de imagen inválida",
                        },
                        }),
                    }}
                    message={errors?.imagen?.message}
                />
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-200 cursor-pointer text-white px-4 py-2 rounded-lg"
                >
                    <SaveIcon />
                  Crear
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4">Editar Producto</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    defaultValue="Nombre del producto"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Precio</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    defaultValue="100"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Guardar Cambios
                </button>
              </form>
            </>
          )}
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
};

export default ModalCreateProduct;