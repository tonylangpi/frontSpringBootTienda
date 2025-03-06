import { useForm } from "react-hook-form";
import InputCorreo from "../inputs/input.jsx";
import InputClave from "../inputs/input.jsx";
import Button from "@mui/material/Button";
import { use } from "react";
import { loginAdminUser } from "../../services/admin-auth-services";
import { ClientContext } from "../../providers/context-auth.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../../assets/Login.jpg";

const LoginAdminPanel = () => {
   const navigate = useNavigate(); 
  const contexto = use(ClientContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      correo: "",
      clave: "",
    },
  });

  const backgroundImageUrl =
  "https://static.vecteezy.com/system/resources/previews/005/210/247/non_2x/bright-abstract-background-orange-color-free-vector.jpg";

 const enviar = handleSubmit(async (user) => {
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
        console.log(user);
         // Simulación de envío a la API
         try {
             const res = await loginAdminUser(user);
           if (res != null) {
             contexto.setLoggedIn(true);
             contexto.login(res)
             navigate("/inventory");
             //Cerrar la alerta de carga y mostrar el mensaje de éxito
             Swal.fire({
               title: "¡Éxito!",
               text: "Credenciales correctas.",
               icon: "success",
             });
             // Resetear el formulario
             reset();
           } else {
             Swal.fire({
               title: "No Autorizado",
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
    <section
      className="flex h-screen w-screen items-center justify-center bg-cover"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white/90 flex rounded-lg shadow-2xl max-w-5xl p-8 items-center gap-4">
        <div className="md:w-1/2">
          <h1 className="font-bold text-3xl text-left text-gray-800 mb-4">
            Login Admin Panel Tienda
          </h1>
          <form onSubmit={enviar} className="flex flex-col gap-5">
            <InputCorreo
              type="email"
              name="correo"
              label={"Correo Admin"}
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
              label={"Clave Admin"}
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
            <div className="col-span-full flex justify-center">
              <Button type="submit" variant="contained" color="success">
                Verificar
              </Button>
            </div>
          </form>
        </div>
        <div className="md:block hidden w-1/2">
          <img src={Logo} alt="logo" className="rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default LoginAdminPanel;