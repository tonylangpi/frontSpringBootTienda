import {use} from 'react';
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
//import {settingsUser} from '../../columns/MenuOptions';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function NavbarClient() {

    const navigate = useNavigate();
    const {
        carrito
    } = use(BuyContext);
//    const {
//     setLoggedIn,
//      } = use(ClientContext);
    // if (status === "loading") {
    //   return (
    //     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    //       <CircularProgress />
    //     </div>
    //   );  // Muestra un spinner mientras la sesión se carga
    // }
  
    // if (!session?.user) {
    //   return (
    //     <div style={{ textAlign: "center" }}>
    //       <h2>No estás autenticado</h2>
    //       <p>Por favor, inicia sesión para continuar.</p>
    //     </div>
    //   );  // Muestra un mensaje si no hay usuario autenticado
    // }
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
   //const [anchorElUser, setAnchorElUser] = useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

  // const redirectRoute = (route) => {
  //   navigate(route);
  // };
    
  const handleClick = () => {
    navigate("/login");
  };


  const handleClickTienda = () => {
    navigate("/");
  };

  const handleClickBuyCar = () => {
    navigate("/buyCar");
    };

return (
    <AppBar position="static" sx={{ backgroundColor: '#00bcd4' }}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    CONVEX-IM STORE
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                </Box>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    CONVEX-IM STORE
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                </Box>
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
                                        position: 'absolute',
                                        top: 10,
                                        right: 10,
                                        backgroundColor: 'red',
                                        borderRadius: '50%',
                                        width: 20,
                                        height: 20,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: 'white',
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
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
);
}
export default NavbarClient;