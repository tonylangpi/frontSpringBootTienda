import axios from "axios";
import Swal from "sweetalert2";


export const loginAdminUser = async (usuario) => {
  try {
    const res = await axios.post(
      `http://localhost:9090/adminUser/login`,
       usuario,
       {
        headers: { "Content-Type": "application/json" }, // Asegurar formato JSON
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

export const createClient = async (client) => {
  try {
    const res = await axios.post(
      `http://localhost:9090/clients/save`,
      client,
      {
        headers: { "Content-Type": "application/json" }, // Asegurar formato JSON
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

export const loginClientUser = async (usuario) => {
  try {
    const res = await axios.post(
      `http://localhost:9090/clients/login`,
       usuario,
       {
        headers: { "Content-Type": "application/json" }, // Asegurar formato JSON
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