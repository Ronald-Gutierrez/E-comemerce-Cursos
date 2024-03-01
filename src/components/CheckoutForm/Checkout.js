import { Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import useStyles from "./styles";
import { useState}  from 'react';
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";

const Checkout = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const steps = ['Dirección de envío', 'Detalles del pago'];
    const [shippingData, setShippingData] = useState({});

    const Form = () => activeStep === 0 ? <AddressForm nextStep={nextStep} /> : <PaymentForm backStep={backStep} />;  // Modificación aquí
  return (
  <>
  <main className={classes.layout}>
    <Paper className={classes.paper}>
        <Typography variant="h4" align="center">
            Verificación de compra
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
        <Form />
    </Paper>

   </main>
  </>
  )
}
export default Checkout;
