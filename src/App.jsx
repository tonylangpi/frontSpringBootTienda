import { use } from 'react'
import { ClientContext } from "./providers/context-auth.jsx";
import Home from './Components/ClientsPages/Home.jsx';
import AdminPanel from './Components/AdminPages/AdminPanel.jsx';
import NavbarAdminPanel from './Components/AdminPages/NavbarAdminPanel.jsx';
import Inventory from './Components/AdminPages/Inventory.jsx';
import './App.css'
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const contexto = use(ClientContext);
   console.log(contexto.loggedIn)
  return (
    <>
      {contexto.loggedIn ? (
        <div className="min-h-screen flex flex-col">
          <NavbarAdminPanel /> 
          <Routes>
            <Route path="/" element={<AdminPanel />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      )}
    </>
  )
}

export default App
