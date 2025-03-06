import { use } from 'react'
import { ClientContext } from "./providers/context-auth.jsx";
import Home from './Components/ClientsPages/Home.jsx';
import AdminPanel from './Components/AdminPages/AdminPanel.jsx';
import NavbarAdminPanel from './Components/AdminPages/NavbarAdminPanel.jsx';
import Inventory from './Components/AdminPages/Inventory.jsx';
import  NavbarClient from './Components/ClientsPages/NavbarClient.jsx'
import Login from './Components/AdminPages/loginAdminPanel.jsx'
import './App.css'
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const contexto = use(ClientContext);
  return (
    <>
      {contexto.loggedIn ? (
        contexto.user.isAdmin === '1' ? (
          <div className="min-h-screen flex flex-col">
            <NavbarAdminPanel /> 
            <Routes>
              <Route path="/" element={<AdminPanel />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/inventory" element={<Inventory />} />
            </Routes>
          </div>
        ) : (
          <div className="min-h-screen flex flex-col">
            <NavbarClient />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        )
      ) : (
        <div className="min-h-screen flex flex-col">
          <NavbarClient />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      )}
    </>
  )
}

export default App
