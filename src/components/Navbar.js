import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from '../assets/logo-ecomers.png';
import '../styles/Navbar.css';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import { actionTypes } from '../reducer';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  color: 'black',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Navbar() {
  const history = useHistory();
  const handleAuth = () => {
    if (user) {
      auth.signOut();
      dispatch({
        type: actionTypes.EMPTY_BASKET,
        basket: []
      })
      dispatch({
        type: actionTypes.SET_USER,
        user: null
      })
      history.push('/')
    }
  }

  const [{ basket, user } , dispatch] = useStateValue();
  return (
    <Box sx={{ flexGrow: 1 }} className='root'>
      <AppBar position="fixed" className='appBar'>
        <Toolbar>
          <Link to="/" >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              className="logo-image"
            >
              <img src={logo} className="logo-image" alt="Logo" />
            </IconButton>
          </Link>

          <div className="navbar-butons-options" >
            <Button
              style={{
                fontWeight: 'bold',
                fontSize: '1.1rem',
                color: 'white' 
              }}
              className="blinking-scale"
            >
              ⭐Hazte Premium⭐
            </Button>
            <Button style={{ fontWeight: 'bold' ,fontSize: '1.1rem'}} color="inherit"> Contacto </Button>
            <Button style={{ fontWeight: 'bold',fontSize: '1.1rem' }} color="inherit"> Acerca </Button>
          </div>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <div className="navbar-buttons">
          <Typography style={{ fontSize: '1.5rem' }}>
            {user ? `Hola ${user.email.split('@')[0]}` : 'Bienvenido'}
          </Typography>



            <Link to="/signin" >
              <Button variant='outlined' onClick={handleAuth}>
                <strong> {user? "Salir" : "Ingresar"} </strong>
              </Button>
            </Link>
          </div>
          <Link to="/checkout-page" >
            <IconButton aria-label='show cart items' color='inherit'>
              <div className="cart-icon">
                <Badge badgeContent={basket?.length} color='error'>
                  <ShoppingCart fontSize='large' />
                </Badge>
              </div>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
