// components/Modal.js
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputNombreClient from "../inputs/input.jsx";
import InputTelefonoClient from "../inputs/input.jsx";
import InputDireccionClient from "../inputs/input.jsx"
import InputCorreoClient from "../inputs/input.jsx";
import InputClaveClient from "../inputs/input.jsx";
import InputNitClient from "../inputs/input.jsx";
import SaveIcon from "@mui/icons-material/Save";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "../../services/admin-auth-services.js";

const RegisterClientPage = () => {
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nombre: "",
      telefono: "",
      direccion:"",
      correo: "",
      clave: "",
      nit: "",
    },
  });

  const enviar = handleSubmit(async (client) => {
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
        const res = await createClient(client)
      console.log(res);
      if (res != null) {
        navigate("/loginClient");
        //Cerrar la alerta de carga y mostrar el mensaje de éxito
        Swal.fire({
          title: "¡Éxito!",
          text: "El usuario cliente se ha creado correctamente.",
          icon: "success",
        });
        // Resetear el formulario
        reset();
      } else {
        Swal.fire({
          title: "Problema",
          text: "El correo ingresado ya tiene usuario",
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

return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md rounded-lg bg-blue-400 p-8 shadow-lg">
    <h2 className="text-2xl font-semibold mb-4">Crear Usuario Cliente</h2>
            <form
                onSubmit={enviar}
                className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
            >
                <InputNombreClient
                    type="text"
                    name="nombre"
                    label={"Nombre Cliente"}
                    register={{
                        ...register("nombre", {
                            required: {
                                value: true,
                                message: "Campo requerido",
                            },
                        }),
                    }}
                    message={errors?.nombre?.message}
                />
                <InputTelefonoClient
                    type="text"
                    name="telefono"
                    label={"Telefono Cliente"}
                    register={{
                        ...register("telefono", {
                            required: {
                                value: true,
                                message: "Campo requerido",
                            },
                            pattern: {
                                value: /^[0-9]{4}-[0-9]{4}$/,
                                message: "Formato inválido. Ejemplo: 1335-3235",
                            },
                        }),
                    }}
                    message={errors?.telefono?.message}
                />
                 <InputDireccionClient
                    type="text"
                    name="direccion"
                    label={"Direccion Cliente"}
                    register={{
                        ...register("direccion", {
                            required: {
                                value: true,
                                message: "Campo requerido",
                            },
                        }),
                    }}
                    message={errors?.direccion?.message}
                />
                <InputCorreoClient
                    type="email"
                    name="correo"
                    label={"Correo Cliente"}
                    register={{
                        ...register("correo", {
                            required: {
                                value: true,
                                message: "Campo requerido",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Correo inválido",
                            },
                        }),
                    }}
                    message={errors?.correo?.message}
                />
                <InputClaveClient
                    type="password"
                    name="clave"
                    label={"Clave Cliente"}
                    register={{
                        ...register("clave", {
                            required: {
                                value: true,
                                message: "Campo requerido",
                            },
                        }),
                    }}
                    message={errors?.clave?.message}
                />
                <InputNitClient
                    type="text"
                    name="nit"
                    label={"NIT Cliente"}
                    register={{
                        ...register("nit", {
                            required: {
                                value: true,
                                message: "Campo requerido",
                            },
                        }),
                    }}
                    message={errors?.nit?.message}
                />
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-200 cursor-pointer text-white px-4 py-2 rounded-lg"
                >
                    <SaveIcon />
                    Guardar
                </button>
            </form>
    </div>
  </div>
);
};

export default RegisterClientPage;
