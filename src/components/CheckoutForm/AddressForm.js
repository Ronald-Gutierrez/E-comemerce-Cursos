import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

export default function AddressForm({ nextStep}) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [cui, setCui] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [semester, setSemester] = React.useState("");

  const [{shippingData}, dispatch] = useStateValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      firstName: firstName,
      lastName: lastName,
      cui: cui,
      phone: phone,
      semester: semester,

    });
    dispatch({
      type: actionTypes.SET_SHIPPING_DATA,
      shippingData: {
        firstName: firstName,
        lastName: lastName,
        cui: cui,
        phone: phone,
        semester: semester,
      }
    });
    nextStep();
  };
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Datos del Usuario
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            value = {firstName}
            onChange = {(e) => setFirstName(e.target.value)}
            required
            id="firstName"
            name="firstName"
            label="Nombres"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value = {lastName}
            onChange = {(e) => setLastName(e.target.value)}
            required
            id="lastName"
            name="lastName"
            label="Apellidos"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value = {cui}
            onChange = {(e) => setCui(e.target.value)}
            required
            id="cui"
            name="cui"
            label="CUI"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value = {phone}
            onChange = {(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
            label="Celular"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value = {semester}
            onChange = {(e) => setSemester(e.target.value)}
            required
            id="semester"
            name="semester"
            label="Semestre"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
        <Button component={Link} to="/checkout-page" variant="contained">Regresar al Carrito</Button>
        <Button type="submit" variant="contained" onClick={handleSubmit} component={Link} to="/checkout/review">Siguiente</Button>
      </div>
    </React.Fragment>
  );
}

export { AddressForm };