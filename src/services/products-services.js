import axios from "axios";
import Swal from "sweetalert2";


export const createProduct = async (usuario) => {
  try {
    const res = await axios.post(
      `http://localhost:9090/products/save`,
      { 
        nombre:usuario.nombre,
        descripcion:usuario.descripcion,
        precio_unitario:usuario.precio_unitario,
        cantidad_disponible:usuario.cantidad_disponible,
        imagen:usuario.imagen
      }
    );
    return res.data;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un problema al enviar los datos. ${error}`,
      icon: "error",
    });
  }
};