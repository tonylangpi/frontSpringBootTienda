import { use, useState, useEffect } from "react";
import {
  StepLabel,
  Button,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Step,
  Stepper,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { BuyContext } from "../../providers/car-buy-context";
import { ClientContext } from "../../providers/context-auth";
import SelectBank from "../inputs/selectInput";
import { Card, CardContent } from "@mui/material";
//import { useNavigate } from "react-router-dom";

const CarBuyListOptions = [
  "Carrito Compras",
  "Selecciona Método de Pago",
  "Ingresa datos para el pago",
  "Pago Finalizado",
];

const CarBuyList = () => {
   //const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });
  //context of car buy
  // const {
  //   userClientInfo, 
  //   setUserClientInfo
  // }  = use(ClientContext)
  const { carrito, setCarrito, addCarBuy } = use(BuyContext);


  // Guardar el carrito en sessionStorage cada vez que cambie
  useEffect(() => {
     sessionStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setPaymentMethod("");
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    handleNext();
  };

  const PayWithCreditCard = async (data) => {
    reset();
    console.log(data);
  };

  const PayWithTransfer = async (data) => {
    console.log(data);
  };

  const PayWithBankDeposit = async (data) => {
    console.log(data);
  };

  const handleRemove = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const renderForm = () => {
    switch (paymentMethod) {
      case "creditCard":
        return (
          <form onSubmit={handleSubmit(PayWithCreditCard)}>
            <Box>
              <div className="flex justify-center mb-4">
                <img
                  src="https://banner2.cleanpng.com/20180810/uqi/9d06e2fa1413a8a2e29f61ef3afd67b9.webp"
                  alt="Visa Logo"
                  className="h-7 w-7"
                />
              </div>
              <Controller
                name="NUMCARD"
                control={control}
                defaultValue={""}
                rules={{
                  required: "Número de tarjeta es requerido",
                  pattern: {
                    value: /^(?:\d{4} \d{4} \d{4} \d{4})$/,
                    message:
                      "Formato de tarjeta inválido, debe ser 0000 0000 0000 0000",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Número de tarjeta"
                    fullWidth
                    margin="normal"
                    error={!!errors.NUMCARD}
                    helperText={errors.NUMCARD ? errors.NUMCARD.message : ""}
                  />
                )}
              />
              <Controller
                name="EXPIRIDATE"
                control={control}
                defaultValue={""}
                rules={{
                  required: "Fecha de expiración es requerida",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                    message: "Formato de fecha inválido, debe ser MM/YY",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fecha de expiración"
                    fullWidth
                    margin="normal"
                    error={!!errors.EXPIRIDATE}
                    helperText={
                      errors.EXPIRIDATE ? errors.EXPIRIDATE.message : ""
                    }
                  />
                )}
              />
              <Controller
                name="CVV"
                control={control}
                defaultValue={""}
                rules={{
                  required: "CVV es requerido",
                  pattern: {
                    value: /^\d{3}$/,
                    message: "CVV inválido son 3 digitos numéricos xxx",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="CVV"
                    fullWidth
                    margin="normal"
                    error={!!errors.CVV}
                    helperText={errors.CVV ? errors.CVV.message : ""}
                  />
                )}
              />
              <Controller
                name="MONTO"
                control={control}
                defaultValue={""}
                rules={{
                  required: "Monto requerido",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Monto inválido debe ser numérico",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="MONTO"
                    fullWidth
                    margin="normal"
                    error={!!errors.MONTO}
                    helperText={errors.MONTO ? errors.MONTO.message : ""}
                  />
                )}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="warning"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Atrás
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button type="submit" color="warning" disabled={!isValid}>
                {activeStep === CarBuyListOptions.length - 1
                  ? "Finalizar"
                  : "Siguiente"}
              </Button>
            </Box>
          </form>
        );
      case "bankDeposit":
        return (
          <Box>
            <form onSubmit={handleSubmit(PayWithBankDeposit)}>
              <Controller
                name="NUMTICKET"
                control={control}
                defaultValue=""
                rules={{ required: "Número de boleta requerido" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Número de Boleta"
                    fullWidth
                    margin="normal"
                    error={!!errors.NUMTICKET}
                    helperText={
                      errors.NUMTICKET ? errors.NUMTICKET.message : ""
                    }
                  />
                )}
              />
              <SelectBank
                name="BANK"
                control={control}
                defaultValue=""
                label="Banco"
                items={[
                  { value: "BANRURAL", label: "BANRURAL" },
                  { value: "BANCO INDUSTRIAL", label: "BANCO INDUSTRIAL" },
                  { value: "BANCO DE GUATEMALA", label: "BANCO DE GUATEMALA" },
                ]}
              />
              <Controller
                name="MONTO"
                control={control}
                defaultValue=""
                rules={{
                  required: "Monto requerido",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Monto inválido debe ser numérico",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="MONTO"
                    fullWidth
                    margin="normal"
                    error={!!errors.MONTO}
                    helperText={errors.MONTO ? errors.MONTO.message : ""}
                  />
                )}
              />
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="warning"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Atrás
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button type="submit" color="warning" disabled={!isValid}>
                  {activeStep === CarBuyListOptions.length - 1
                    ? "Finalizar"
                    : "Siguiente"}
                </Button>
              </Box>
            </form>
          </Box>
        );
      case "transfer":
        return (
          <Box>
            <form onSubmit={handleSubmit(PayWithTransfer)}>
              <Controller
                name="sourceAccount"
                control={control}
                defaultValue=""
                rules={{
                  required: "Número de cuenta de origen es requerido",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Monto inválido debe ser numérico",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Número de cuenta de origen"
                    fullWidth
                    margin="normal"
                    error={!!errors.sourceAccount}
                    helperText={
                      errors.sourceAccount ? errors.sourceAccount.message : ""
                    }
                  />
                )}
              />
              <Controller
                name="destinationAccount"
                control={control}
                defaultValue=""
                rules={{
                  required: "Número de cuenta de destino es requerido",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Monto inválido debe ser numérico",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Número de cuenta de destino"
                    fullWidth
                    margin="normal"
                    error={!!errors.destinationAccount}
                    helperText={
                      errors.destinationAccount
                        ? errors.destinationAccount.message
                        : ""
                    }
                  />
                )}
              />
              <Controller
                name="amount"
                control={control}
                defaultValue=""
                rules={{
                  required: "Monto es requerido",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Monto inválido debe ser numérico",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Monto"
                    fullWidth
                    margin="normal"
                    error={!!errors.amount}
                    helperText={errors.amount ? errors.amount.message : ""}
                  />
                )}
              />
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="warning"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Atrás
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button type="submit" color="warning" disabled={!isValid}>
                  {activeStep === CarBuyListOptions.length - 1
                    ? "Finalizar"
                    : "Siguiente"}
                </Button>
              </Box>
            </form>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Card className="p-4">
        <CardContent>
          <Stepper activeStep={activeStep}>
            {CarBuyListOptions.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === CarBuyListOptions.length - 1 ? (
              <>
                <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                  Paso Final se ha enviado a tu correo el comprobante de pago
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset} color="warning">
                    Reiniciar
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography sx={{ mt: 2, mb: 1 }} variant="h5">
                  Paso {activeStep + 1} las entregas son a domicilio
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", pt: 2 }}>
                  {activeStep === 0 && (
                    <>
                      <h1>Productos añadidos al carrito</h1>
                      {carrito.map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            mb: 2,
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6">{item.nombre}</Typography>
                            <Typography variant="body2">
                              Precio: Q. {item.precio_unitario.toLocaleString()}
                            </Typography>
                            <Typography variant="body2">
                              Cantidad Solicitada: {item.quantity}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={addCarBuy(item)}
                            >
                              Agregar 1 más
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => {
                                const existingItem = carrito.find(
                                  (card) => card.id === item.id
                                );

                                if (!existingItem) return; // Si no encuentra el producto, no hace nada

                                if (existingItem.quantity > 1) {
                                  setCarrito((prev) =>
                                    prev.map((card) =>
                                      card.id === item.id
                                        ? {
                                            ...card,
                                            quantity: card.quantity - 1,
                                          }
                                        : card
                                    )
                                  );

                                  Swal.fire({
                                    title: "Cantidad reducida",
                                    text: `Se ha reducido en 1 la cantidad de "${item.nombre}" en el carrito.`,
                                    icon: "info",
                                    timer: 2500,
                                    showConfirmButton: false,
                                  });
                                } else {
                                  Swal.fire({
                                    title: "¿Eliminar producto?",
                                    text: `¿Deseas eliminar "${item.nombre}" del carrito?`,
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonText: "Sí, eliminar",
                                    cancelButtonText: "Cancelar",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      handleRemove(item.id);

                                      Swal.fire({
                                        title: "Producto eliminado",
                                        text: `"${item.nombre}" ha sido eliminado del carrito.`,
                                        icon: "success",
                                        timer: 1500,
                                        showConfirmButton: false,
                                      });
                                    }
                                  });
                                }
                              }}
                            >
                              Quitar 1
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => {
                                Swal.fire({
                                  title: "¿Eliminar producto?",
                                  text: `¿Deseas eliminar "${item.nombre}" del carrito?`,
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonText: "Sí, eliminar",
                                  cancelButtonText: "Cancelar",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    handleRemove(item.id);

                                    Swal.fire({
                                      title: "Producto eliminado",
                                      text: `"${item.nombre}" ha sido eliminado del carrito.`,
                                      icon: "success",
                                      timer: 1500,
                                      showConfirmButton: false,
                                    });
                                  }
                                });
                              }}
                            >
                              Eliminar
                            </Button>
                          </Box>
                        </Box>
                      ))}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mt: 2 }}
                      >
                        Total Carrito: Q.{" "}
                        {carrito
                          .reduce(
                            (acc, item) =>
                              acc + item.quantity * item.precio_unitario,
                            0
                          )
                          .toLocaleString()}
                      </Typography>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
                        <Button
                          color="warning"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Atrás
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={handleNext}
                          disabled={carrito.length === 0}
                        >
                          Siguiente
                        </Button>
                      </Box>
                    </>
                  )}
                  {activeStep === 1 && (
                    <>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Método de Pago</FormLabel>
                        <RadioGroup
                          aria-label="paymentMethod"
                          name="paymentMethod"
                          value={paymentMethod}
                          onChange={handlePaymentMethodChange}
                        >
                          <FormControlLabel
                            value="creditCard"
                            control={<Radio />}
                            label="Tarjeta de Crédito"
                          />
                          <FormControlLabel
                            value="bankDeposit"
                            control={<Radio />}
                            label="Depósito Bancario"
                          />
                          <FormControlLabel
                            value="transfer"
                            control={<Radio />}
                            label="Transferencia"
                          />
                        </RadioGroup>
                        <Box
                          sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                        >
                          <Button
                            color="warning"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                          >
                            Atrás
                          </Button>
                          <Box sx={{ flex: "1 1 auto" }} />
                          <Button
                            variant="contained"
                            color="warning"
                            onClick={handleNext}
                            disabled={carrito.length === 0}
                          >
                            Siguiente
                          </Button>
                        </Box>
                      </FormControl>
                    </>
                  )}
                  {activeStep === 2 && <>{renderForm()}</>}
                  {activeStep === 3 && (
                    <>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        Confirmación del pago
                      </Typography>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Atrás
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button type="submit" disabled={!isValid}>
                          {activeStep === CarBuyListOptions.length - 1
                            ? "Finalizar"
                            : "Siguiente"}
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CarBuyList;
