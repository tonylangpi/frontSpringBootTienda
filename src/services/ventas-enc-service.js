import axios from 'axios';
import Swal from 'sweetalert2';

export const createFactEnc = async (clienteID) => {
    try {
      const res = await axios.post(
        `http://localhost:9090/ventasEnc/save`,
        {
            idCliente: clienteID
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

  export const createDetails = async (details) => {
    try {
      const res = await axios.post(
        `http://localhost:9090/ventasDec/save`,
         details
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

  export const getHeaderFact = async(factId) =>{
    try {
      const res = await axios.get(
        `http://localhost:9090/ventasEnc/encById/${factId}`,
      );
      return res.data;
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Hubo un problema al enviar los datos. ${error}`,
        icon: "error",
      });
    }
  }

  export const gertDetailsFact = async(factId) =>{
     try {
      const res = await axios.get(
        `http://localhost:9090/ventasDec/details/${factId}`,
      );
      return res.data;
      
     } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Hubo un problema al enviar los datos. ${error}`,
        icon: "error",
      });
     }
  }