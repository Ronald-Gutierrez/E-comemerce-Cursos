import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useStateValue } from '../../StateProvider';
import { ButtonGroup, IconButton, List, ListItem, ListItemText, Stack } from '@mui/material';
import { actionTypes } from '../../reducer';
import { getBasketTotal } from '../../reducer';
import accounting from 'accounting';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import bcp from '../../assets/bcp-pago.png';
import interB from '../../assets/interbank-logo.png';
import bbva from '../../assets/bbva-pago.png';
import yape from '../../assets/yape-pago.png';
import plin from '../../assets/plin-logo.png';
import { Link } from 'react-router-dom';
import AddressForm from './AddressForm';
import fotoyape from '../../assets/FOTOYAPE.jpg';

const stripePromise = loadStripe("")
const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    default:
      throw new Error('Unknown step');
  }
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function PaymentForm({backStep}) {
  const [cardName, setCardName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [expDate, setExpDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [saveCard, setSaveCard] = React.useState(false);
  const [paymentData, setPaymentData] = React.useState({});
  const [paymentMethod, setPaymentMethod] = React.useState(""); // Estado para controlar el método de pago seleccionado
  const [showBCPForm, setShowBCPForm] = React.useState(false); // Estado para controlar si el formulario BCP está visible
  const [activeStep, setActiveStep] = React.useState(0);
  const [showYape, setShowYape] = React.useState(false);
  const [showPlin, setShowPlin] = React.useState(false);
  

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleBCPFormToggle = () => {
    setShowBCPForm(!showBCPForm);
  };
  const handleYAPE = () => {
    setShowYape(!showYape);
  };
  const handlePLIN = () => {
    setShowPlin(!showPlin);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      cardName: cardName,
      cardNumber: cardNumber,
      expDate: expDate,
      cvv: cvv,
      saveCard: saveCard,
      paymentMethod: paymentMethod // Agregar método de pago al objeto de datos de pago
    });
    setPaymentData({
      cardName: cardName,
      cardNumber: cardNumber,
      expDate: expDate,
      cvv: cvv,
      saveCard: saveCard,
      paymentMethod: paymentMethod
    });
  };

  const [{ basket }, dispatch] = useStateValue();
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Resumen del Pedido
      </Typography>
      <List disablePadding>
      {basket.reduce((acc, product) => {
    const existingProduct = acc.find(item => item.name === product.name);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      acc.push({ ...product, quantity: 1 });
    }
    return acc;
  }, []).map((product) => (
    <ListItem key={product.name}>
      <ListItemText
        primary={<Typography variant="body" sx={{ fontWeight: 700 }}>{product.name}</Typography>}
        secondary={`Cantidad: ${product.quantity}`}
      />
      <Typography sx={{ fontWeight: 700 }} variant="body">
        {accounting.formatMoney(product.price * product.quantity, "S/.", 2, ".", ",")}
      </Typography>
    </ListItem>
      ))}
      <ListItem sx={{ fontWeight: 700 }}>
        <ListItemText primary={<Typography variant="body" sx={{ fontWeight: 700 }}>Total</Typography>} />
        <Typography sx={{ fontWeight: 700 }} variant="body">
          {accounting.formatMoney(getBasketTotal(basket), "S/.", 2, ".", ",")}
        </Typography>
      </ListItem>
      </List>
      {/* Total del carrito */}
      <Typography variant="h6" gutterBottom>
        Puedes realizar el pago con:
      </Typography>
      
      <Stack direction="row" spacing={2}>
      <Item
        style={{
          backgroundColor: 'orange',
          padding: '10px',
          borderRadius: '5px',
          cursor: 'pointer',
          color: 'black',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: 'white',
            color: 'black',
          },
        }}
        onClick={() => handlePaymentMethodChange("Tarjetas")}
      >
        Tarjetas
      </Item>

        <Item 
          style={{
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            color: 'black',
            backgroundColor: 'orange'
          }}
          onClick={() => handlePaymentMethodChange("Yape o Plin")}
        >
          Yape o Plin
        </Item>
      </Stack>
        
      {paymentMethod === "Tarjetas" && (
        <div>
          <Typography variant="h6" gutterBottom>
          <IconButton onClick={handleBCPFormToggle}>
            <img src={bcp} className="logo-image" alt="BCP Logo" style={{ width: '100px', height: '30px', marginTop:'10px', marginBottom:'20px', marginRight: '10px' }} />
          </IconButton>
          <IconButton onClick={handleBCPFormToggle}>
            <img src={interB} className="logo-image" alt="Interbank Logo" style={{ width: '100px', height: '30px', marginRight: '10px' }} />
          </IconButton>
          <IconButton onClick={handleBCPFormToggle}>
            <img src={bbva} className="logo-image" alt="BBVA Logo" style={{ width: '110px', height: '30px' , background:'white' }} />
          </IconButton>
          </Typography>

        </div>
      )}
      {paymentMethod === "Yape o Plin" && (
        <div>
          <Typography variant="h6" gutterBottom>
          <IconButton>
            <img onClick={handleYAPE} src={yape} className="logo-image" alt="Interbank Logo" style={{ width: '100px', height: '60px', marginTop: '10px',marginRight: '10px' }} />
          </IconButton>
          <IconButton>
            <img onClick={handlePLIN}src={plin} className="logo-image" alt="BBVA Logo" style={{ width: '100px', height: '60px', marginTop: '10px', background:'white' }} />
          </IconButton>
          </Typography>
          {/* Aquí irían los campos de Yape o Plin */}
          {/* Botón de pagar */}
          
        </div>
      )}
      {paymentMethod === "Yape o Plin" && showYape && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={fotoyape} className="logo-image" alt="Yape Logo" style={{ width: '300px', height: '320px' }} />
        </div>
      )} 
      {paymentMethod === "Yape o Plin" && showPlin && (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Solo hay yape por este momento
        </Typography>
        <img src={fotoyape} className="logo-image" alt="Yape Logo" style={{ width: '300px', height: '320px' }} />
      </div>

      )}

      {paymentMethod === "Tarjetas" && showBCPForm && (
        <div>
          <Typography variant="h6" gutterBottom>
            Ingresa los datos de tu tarjeta:
          </Typography>
        <Grid container spacing={3}>
          <Grid item xs={16} sm={12}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    label="Número de tarjeta"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <FormControlLabel
                control={<Checkbox checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} />}
                label="Guardar tarjeta para futuras compras"
              />
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item>
                  <Button type="button" variant="contained" color="secondary" onClick={backStep} >Retroceder</Button>
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained" color="primary">Pagar {accounting.formatMoney(getBasketTotal(basket), "S/.", 2, ".", ",")}</Button>
                </Grid>
              </Grid>
              
            </form>
          </Grid>
        </Grid>
      </div>

      )}
      
    </React.Fragment>
  );


}
