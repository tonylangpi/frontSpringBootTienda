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

export const editProduct = async (product) => {
  try {
    const res = await axios.put(
      `http://localhost:9090/products/edit/${product.id}`,
      { 
        nombre:product.nombre,
        descripcion:product.descripcion,
        precio_unitario:product.precio_unitario,
        cantidad_disponible:product.cantidad_disponible,
        imagen:product.imagen
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

export const deleteProduct = async (id) => {
  try {
    const res = await axios.put(
      `http://localhost:9090/products/updateStatus/${id}`
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