import Product from "@/models/Product";
import db from "@/utils/db";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Link from "next/link";
import Layout from "./components/Layout";

export default function Home(props) {
  const { products } = props;
  return (
    <>
      <Layout>
        <div>
          <h1>
            <Typography fontSize="32px" fontWeight="bold">
              Products
            </Typography>
          </h1>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item md={4} key={product.name}>
                <Card>
                  <Link href={`/product/${product.slug}`}>
                    <CardActionArea>
                      <CardMedia component="img" image={product.image} title={product.name}></CardMedia>
                      <CardContent>
                        <Typography>{product.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Typography>${product.price}</Typography>
                      <Button size="small" color="primary">
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
