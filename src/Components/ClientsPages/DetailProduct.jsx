import {use} from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useSWR";
import Swal from "sweetalert2";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import InputCantidad from "../inputs/input";
import { useForm } from "react-hook-form";
import { BuyContext } from "../../providers/car-buy-context";

const DetailProduct = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchData(`/products/detail/${id}`);



  const { setCarrito } = use(BuyContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      id: data?.id,
      quantity: 1,
      cantidad_disponible: data?.cantidad_disponible,
      precio_unitario: data?.precio_unitario,
      nombre: data?.nombre,
    },
  });

  const enviar = handleSubmit(async (product) => {
    try {
      const response = await fetch(`http://localhost:9090/products/detail/${product.id}`);
      const productDetail = await response.json();
      console.log(productDetail);
      if (response.ok) {
        const availableQuantity = productDetail.cantidad_disponible;

        setCarrito((prev) => {
          const existingItem = prev.find((item) => item.id === product.id);
          console.log(existingItem)
          const currentQuantity = existingItem ? existingItem.quantity : 0;
          const totalQuantity = currentQuantity + product.quantity;

          if (totalQuantity > availableQuantity) {
            Swal.fire({
              title: "Error",
              text: `No hay suficientes existencias de ${product.nombre}.`,
              icon: "error",
            });
            return prev; // Detenemos la actualización del estado
          } else {
            Swal.fire({
              title: "Éxito",
              text: `${product.nombre} ha sido agregado al carrito.`,
              icon: "success",
            });
            // Si hay espacio, actualizar cantidad o agregar nuevo producto
            if (existingItem) {
              return prev.map((item) =>
                item.id === product.id ? { ...item, quantity: totalQuantity } : item
              );
            } else {
              return [...prev, { ...product, quantity: product.quantity }];
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
        text: `Ocurrió un error al obtener la información del producto. ${error}`,
        icon: "error",
      });
    }
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
                                      <input
                                        type="hidden"
                                        name="id"
                                        value={data?.id}
                                        {...register("id")}
                                      />
                                      <input
                                        type="hidden"
                                        name="cantidad_disponible"  
                                        value={data?.cantidad_disponible}
                                        {...register("cantidad_disponible")}
                                      />
                                      <input
                                        type="hidden"
                                        name="precio_unitario"
                                        value={data?.precio_unitario}
                                        {...register("precio_unitario")}
                                      />
                                      <input
                                        type="hidden"
                                        name="nombre"
                                        value={data?.nombre}
                                        {...register("nombre")}
                                      />
                                    <InputCantidad
                                        type="number"
                                        step="1"
                                        name="quantity"
                                        label={"cantidad producto"}
                                        register={{
                                            ...register("quantity", {
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
                                        message={errors?.quantity?.message}
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
