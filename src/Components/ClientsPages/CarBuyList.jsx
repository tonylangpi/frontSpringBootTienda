import { useState, use} from "react";
import { Button, IconButton, Card, CardContent } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { BuyContext } from "../../providers/car-buy-context";

export default function CarBuyList() {
  const [quantity, setQuantity] = useState(1);
  const price = 1565;

  const{
    listDetails,
  } = use(BuyContext);

   console.log(listDetails);

  return (
    <div className="container mx-auto p-6">
      {/* Progreso de compra */}
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <div className="text-orange-500 font-semibold">1. Mi carrito</div>
        <div className="text-gray-400">2. Pago</div>
        <div className="text-gray-400">3. Fin del pedido</div>
      </div>
      
      {/* Métodos de Entrega y Pago */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="font-bold mb-2">Método de entrega</h2>
          <Button variant="outlined" className="mr-2">Recoger en tienda</Button>
          <Button variant="outlined" disabled>A domicilio</Button>
        </div>
        <div>
          <h2 className="font-bold mb-2">Método de pago</h2>
          <Button variant="outlined" className="mr-2">Tarjeta</Button>
          <Button variant="outlined" disabled>Monetario</Button>
        </div>
      </div>

      {/* Carrito */}
      <Card className="mb-6">
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="https://via.placeholder.com/80" alt="Tablet" className="mr-4 rounded-lg" />
              <div>
                <h3 className="font-semibold">Tablet Redmi Pad Se 4gb 128gb 8.7"</h3>
                <p className="text-gray-600">Precio unitario: Q{price}</p>
              </div>
            </div>
            <div className="flex items-center">
              <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}><Remove /></IconButton>
              <span className="mx-2 font-semibold">{quantity}</span>
              <IconButton onClick={() => setQuantity(quantity + 1)}><Add /></IconButton>
              <IconButton className="text-red-500 ml-4"><Delete /></IconButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumen */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <h2 className="font-bold mb-2">Resumen</h2>
        <div className="flex justify-between">
          <span>Sub Total</span>
          <span>Q{price * quantity}</span>
        </div>
        <div className="flex justify-between">
          <span>Descuento</span>
          <span>- Q0</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total</span>
          <span>Q{price * quantity}</span>
        </div>
        <Button variant="contained" color="primary" fullWidth className="mt-4">Finalizar mi compra</Button>
        <Button variant="outlined" fullWidth className="mt-2">Agregar otro producto</Button>
        <Button variant="text" fullWidth className="mt-2 text-gray-500">Limpiar mi carrito</Button>
      </div>
    </div>
  );
}
