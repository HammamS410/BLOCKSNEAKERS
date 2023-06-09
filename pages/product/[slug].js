import Product from "@/models/Product";
import classes from "@/utils/classes";
import db from "@/utils/db";
import { Store } from "@/utils/Store";
import { Button, Card, Grid, List, ListItem, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import Layout from "../components/Layout";

export default function ProductScreen(props) {
  const { dispatch } = useContext(Store);
  const { product } = props;
  if (!product) {
    return <div>Product Not Found</div>;
  }
  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock <= 0) {
      window.alert("Product Out Of Stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: 1 } });
  };
  return (
    <Layout title={product.name}>
      <div className={classes.section}>
        <Link href="/">
          <Typography marginBottom={1} marginTop={0.5} color="primary">
            back to products
          </Typography>
        </Link>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image src={product.image} alt={product.name} width={640} height={640} layout="responsive"></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1" ml={2}>
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} stars ({product.numReviews})
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price: </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography> $ {product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status: </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{product.countInStock > 0 ? "Stock Available" : "Out Of Stock"}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button fullWidth variant="contained" color="primary" onClick={addToCartHandler}>
                  Add to Cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
