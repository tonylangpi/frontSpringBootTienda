import React from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useSWR";
import Swal from "sweetalert2";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import InputCantidad from "../inputs/input";
import { useForm } from "react-hook-form";

const DetailProduct = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchData(`/products/detail/${id}`);

  console.log(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      id: data?.id,
      cantidad_requerida: "",
    },
  });

  const enviar = handleSubmit(async (product) => {
    //console.log(product);
    // Simulación de envío a la API
    Swal.fire({
                title: "¡Éxito!",
                text: `Se ha agregado ${product.cantidad_requerida} producto(s) al carrito del codigo ${product.id}`,
                icon: "success",
              });
    reset();

    //   // Mostrar la alerta de carga
    //   Swal.fire({
    //     title: "Cargando...",
    //     text: "Por favor espera mientras se envían los datos.",
    //     icon: "info",
    //     allowOutsideClick: false, // No se puede cerrar fuera de la alerta
    //     didOpen: () => {
    //       Swal.showLoading(); // Muestra el cargador
    //     },
    //   });

    //   // Simulación de envío a la API
    //   try {
    //       const res = await createProduct(product)
    //     console.log(res);
    //     if (res) {
    //       navigate("/inventory");
    //       //Cerrar la alerta de carga y mostrar el mensaje de éxito
    //       Swal.fire({
    //         title: "¡Éxito!",
    //         text: "El producto se ha creado correctamente.",
    //         icon: "success",
    //       });
    //       // Resetear el formulario
    //       reset();
    //       mutate();
    //       // Cerrar el modal
    //       onClose();
    //     } else {
    //       Swal.fire({
    //         title: "Problema",
    //         text: "hubo un error al enviar los datos",
    //         icon: "error",
    //       });
    //     }
    //   } catch (error) {
    //     // Si hay un error, mostrar alerta de error
    //     Swal.fire({
    //       title: "Error",
    //       text: `Hubo un problema al enviar los datos.${error}`,
    //       icon: "error",
    //     });
    //   }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

return (
    <div className="container mx-auto p-2">
        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
                <img
                    src={data?.imagen}
                    alt="Product"
                    className="w-75 h-auto object-cover"
                />
            </div>
            <div className="md:w-1/2 md:pl-8">
                <h1 className="text-3xl font-bold mb-4">{data?.nombre}</h1>
                <p className="text-xl text-gray-700 mb-4">
                    Q. {data?.precio_unitario.toLocaleString()}
                </p>
                <p className="text-gray-600 mb-4">{data?.descripcion}</p>
                {
                            data?.estado === true ? (
                                    <form onSubmit={enviar} className="flex flex-col gap-5">
                 
                                    <InputCantidad
                                        type="number"
                                        step="1"
                                        name="cantidad_disponible"
                                        label={"cantidad producto"}
                                        register={{
                                            ...register("cantidad_requerida", {
                                                required: {
                                                    value: true,
                                                    message: "Campo requerido",
                                                },
                                                pattern: {
                                                    value: /^[0-9]+(\.[0-9]+)?$/,
                                                    message: "Solo se permiten números positivos",
                                                },
                                            }),
                                        }}
                                        message={errors?.cantidad_requerida?.message}
                                    />
            
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className="w-1/2 self-center"
                                        type="submit"
                                        startIcon={<AddShoppingCartIcon />}
                                    >
                                        Agregar al Carrito
                                    </Button>
                                </form>
                            ) : (
                                    <p className="text-red-500">Producto no disponible</p>  
                            )
                    }
            </div>
        </div>
    </div>
);
};

export default DetailProduct;
