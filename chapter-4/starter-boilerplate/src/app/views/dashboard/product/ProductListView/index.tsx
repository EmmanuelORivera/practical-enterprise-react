import React, { useEffect, useState, useCallback } from 'react';
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  makeStyles,
} from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import Page from 'app/components/page';
import { ProductType } from 'models/product-type';
import { getProductAxios } from 'services/productService';
import Header from './Header';
import Results from './Results';

const ProductListView = () => {
  const classes = useStyles();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [open, setOpen] = useState(false);

  const fetchProducts = useCallback(async () => {
    handleToggle();
    try {
      const { data } = await getProductAxios();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
    handleClose();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Page className={classes.root} title="Product List">
      <Container maxWidth={false}>
        <Header />
        {products && (
          <Box mt={3}>
            <Results products={products} />
          </Box>
        )}
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </Page>
  );
};

const useStyles = makeStyles(theme =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    root: {
      minHeight: '100%',
      paddingTop: theme.spacing(3),
      paddingBottom: 100,
    },
  }),
);
export default ProductListView;
