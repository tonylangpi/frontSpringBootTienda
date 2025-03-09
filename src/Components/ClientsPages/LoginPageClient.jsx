import reactLogo from "../../assets/logoTienda.webp";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputCorreo from "../inputs/input";
import InputClave from "../inputs/input";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import {loginClientUser} from "../../services/admin-auth-services.js";
import { use } from "react";
import { ClientContext } from "../../providers/context-auth.jsx";
import { useNavigate } from "react-router-dom";


const LoginPageClient = () => {
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: "onChange",
    defaultValues: {
      correo: "",
      clave: "",
    },
  });
  const {
    setUserClientInfo
  } = use(ClientContext);


  const enviar = handleSubmit(async (user) => {
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
               const res = await loginClientUser(user);
               console.log(res);
             if (res != null) {
               setUserClientInfo(
                res
               );
               //Cerrar la alerta de carga y mostrar el mensaje de éxito
               Swal.fire({
                 title: "¡Éxito!",
                 text: "Credenciales correctas",
                 icon: "success",
               });
               // Resetear el formulario
               reset();
               navigate("/Home");
             } else {
               Swal.fire({
                 title: "Error",
                 text: "Credenciales incorrectas",
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
      <div className="w-full max-w-md rounded-lg p-8 bg-blue-300 shadow-lg" >
        <div className="mb-6 flex justify-center">
          <img src={reactLogo} alt="Logo" className="h-auto w-32" />
        </div>

        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">
          Iniciar sesión
        </h2>

        <form onSubmit={enviar} className="flex flex-col gap-5">
          <InputCorreo
            type="email"
            name="correo"
            label={"Correo"}
            register={{
              ...register("correo", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Correo inválido",
                },
              }),
            }}
            message={errors?.correo?.message}
          />

          <InputClave
            type="password"
            name="clave"
            label={"Contraseña"}
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Iniciar sesión
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/RegisterClient" className="text-indigo-600 hover:text-indigo-700">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPageClient;
