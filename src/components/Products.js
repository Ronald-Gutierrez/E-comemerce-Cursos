import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Product from './Product';
import products from '../product-data.js';
const StyledGrid = styled(Grid)({
  padding: '20px', 
});

export default function Products() {
  return (
    <Grid container spacing={2} style={{ margin: '20px 0' }}>
      {
        products.map((product) => (
          <StyledGrid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Product product={product} />
          </StyledGrid>
        ))
      }
    </Grid>
  )
}
