import React from 'react';
import accounting from 'accounting';    
import { Button } from '@mui/material';
import '../styles/Total.css';
import { useStateValue } from '../StateProvider';
import { getBasketTotal } from '../reducer';
import { Link } from 'react-router-dom';

const Total = () => {
    const [{ basket, user }] = useStateValue();

    // Verifica si el usuario está autenticado
    const isAuthenticated = user !== null;

    return (
        <div className="total-main">
            <h5>Total de Productos: {basket?.length}</h5>
            <h5>{accounting.formatMoney(getBasketTotal(basket), "S/.", 2, ".", ",")}</h5>
            {isAuthenticated ? (
                <Link to="/checkout">
                    <Button className="btn-pay" variant="contained" color="secondary">Pagar</Button>
                </Link>
            ) : (
                <Link to="/signin">
                    <Button className="btn-pay" variant="contained" color="secondary">Inicia sesión para pagar</Button>
                </Link>
            )}
        </div>
    );
};

export default Total;
