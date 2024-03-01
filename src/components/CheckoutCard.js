import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import accounting from 'accounting';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/CheckoutCard.css';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';

export default function CheckoutCard({ product : { id, name, productType, price, rating, image, description } }) {
  const [{ basket }, dispatch] = useStateValue();
  const removeToBasket = () => {
    dispatch({
      type: actionTypes.REMOVE_TO_BASKET,
      item: {
        id,
        name,
        productType,
        price,
        rating,
        image,
        description,
      }
    })
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <Typography
          variant='h5'
          color='textSecondary'
          >
          {accounting.formatMoney(price, "S/.",2, ".", ",")}
          </Typography>
        }
        title={<Typography variant='h5' style={{ fontWeight: 'bold' }}>{name}</Typography>}
        subheader="in stock"
      />
      <CardMedia
        component="img"
        height="194"
        image={image}        
        alt="Paella dish"
        title={name}
      />
      
      <CardActions disableSpacing className='card-action'>
        <div className='card-rating'>
          {Array(rating)
          .fill()
          .map((_, i) => (
              <p>⭐</p>
          ))}
        </div>
        <IconButton aria-label="delete" onClick={removeToBasket}>
          <DeleteIcon fontSize='large'/>
        </IconButton>
      </CardActions>

    </Card>
  );
}