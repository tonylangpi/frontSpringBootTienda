import {use, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { BuyContext } from "../../providers/car-buy-context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginIcon from '@mui/icons-material/Login';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import {ClientContext} from "../../providers/context-auth"

function NavbarClient() {

    const navigate = useNavigate();
    const {
        carrito,
        setCarrito
    } = use(BuyContext);

        const {
          userClientInfo,
          setUserClientInfo
        } = use(ClientContext);
      
     // Guardar el userClientInfo en sessionStorage cada vez que cambie
     useEffect(() => {
      sessionStorage.setItem("client", JSON.stringify(userClientInfo));
      sessionStorage.setItem("carrito", JSON.stringify(carrito))
    }, [userClientInfo, carrito]);
    
  const handleClick = () => {
    navigate("/login");
  };


  const handleClickCliente = () => {
    navigate("/loginClient");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("client");
    setUserClientInfo({})
    sessionStorage.removeItem("carrito");
    setCarrito([])
    navigate("/Home");
  }

  const handleClickTienda = () => {
    navigate("/Home");
  };

  const handleClickBuyCar = () => {
    navigate("/buyCar");
    };

return (
    <AppBar position="static" sx={{ backgroundColor: "#00bcd4" }}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{
                        mr: 2,
                        display: { xs: "none", md: "flex" },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    CONVEX-IM STORE
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                        mr: 2,
                        display: { xs: "flex", md: "none" },
                        flexGrow: 1,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    CONVEX-IM STORE
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip onClick={() => handleClickTienda()} title="Tienda">
                        <IconButton sx={{ p: 3 }}>
                            <StorefrontIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Carrito de Compras">
                        <IconButton onClick={() => handleClickBuyCar()} sx={{ p: 3 }}>
                            <ShoppingCartIcon sx={{ fontSize: 30 }} />
                            {carrito.length > 0 && (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 10,
                                        right: 10,
                                        backgroundColor: "red",
                                        borderRadius: "50%",
                                        width: 20,
                                        height: 20,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "white",
                                        fontSize: 12,
                                    }}
                                >
                                    {carrito.length}
                                </Box>
                            )}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Iniciar Sesión como Admin">
                        <IconButton onClick={() => handleClick()} sx={{ p: 3 }}>
                            <AdminPanelSettingsIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                    </Tooltip>
                    {userClientInfo && Object.keys(userClientInfo).length > 0 ? (
                        <Tooltip title="Cerrar Sesión">
                            <IconButton onClick={() => handleLogout()} sx={{ p: 3 }}>
                                <LogoutSharpIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Iniciar Sesión como Cliente">
                            <IconButton onClick={() => handleClickCliente()} sx={{ p: 3 }}>
                                <LoginIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
);
}
export default NavbarClient;