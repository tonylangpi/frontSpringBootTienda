import {use, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ClientContext } from "../../providers/context-auth";
import {settingsUser} from '../../columns/MenuOptions';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function NavbarAdminPanel() {

    const navigate = useNavigate();
   const {
    setLoggedIn,
    login,
     } = use(ClientContext);
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
   const [anchorElUser, setAnchorElUser] = useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const redirectRoute = (route) => {
  //   navigate(route);
  // };

  // useEffect(() => {
  //     // const loggedIn = localStorage.getItem('loged') 
  //     // const isAdmin = localStorage.getItem('isAdmin')
  //     const loged = localStorage.getItem('loged'); 
  //     const isAdmin = localStorage.getItem('isAdmin');
  //     const storedLoged = JSON.parse(loged);
  //     const storedAdmin = JSON.parse(isAdmin);
  //     console.log(storedLoged);
  //     console.log(storedAdmin);
  //     if (storedLoged === true && storedAdmin === 1) {
  //       contexto.loggedIn(true);
  //       //contexto.login(')
  //     }
  //     else{
  //       setLoogged(false);
  //       setAdmin(null);
  //     }
  //   }, [contexto]);
    
  const handleClick = () => {
    Swal.fire({
      title: "!Adiós!",
      text: "Admin Panel cerrado",
      icon: "success",
      confirmButtonText: "OK",
    });
    navigate("/");
    setLoggedIn(false);
    login(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#00bcd4' }}>
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
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
          CONVEX-IM ADMIN
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          {/* <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {menuItems.map((item, index) => (
              <MenuItem key={index} onClick={() => redirectRoute(item.href)}>
                {item.text}
              </MenuItem>
            ))}
          </Menu> */}
        </Box>
        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
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
          CONVEX-IM ADMIN
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {/* {menuItems.map((item, index) => (
          <Button
            key={index}
            onClick={() => redirectRoute(item.href)}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            {item.text}
          </Button>
            ))} */}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Opciones">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp"/>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settingsUser.map((item, index) => (
              <MenuItem key={index} onClick={() => {handleClick()}}>
                {item.text}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
  );
}
export default NavbarAdminPanel;