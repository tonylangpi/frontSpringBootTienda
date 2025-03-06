import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import React, { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const Inventory = lazy(() => import('./Inventory'));

    const navigate = useNavigate();

    const handleCardClick = () => {
      navigate('/inventory');
    };

    return (
      <div className="admin-panel flex flex-col min-h-screen">
        <div className="banner bg-green-500 text-white py-4">
          <h1 className="text-3xl font-bold text-center">Gestion de Productos Tienda</h1>
        </div>
        <div className="content flex-grow p-4">
          <div className="quick-links grid grid-cols-1 sm:grid-cols-1 gap-4">
            <div 
              className="card bg-yellow-300 shadow-md rounded-lg p-4 hover:bg-green-200 cursor-pointer"
              onClick={handleCardClick}
            >
              <div className="flex items-center justify-center mb-2">
                <ProductionQuantityLimitsIcon alt="avatar" className="p-2" style={{ fontSize: 40 }} />
                <h2 className="text-xl font-black">Inventario</h2>
              </div>
              <p className="text-black">Gestiona el inventario de productos.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default AdminPanel;
