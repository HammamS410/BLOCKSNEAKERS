import data from "@/utils/data";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Link from "next/link";
import Layout from "./components/Layout";

export default function Home() {
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
            {data.products.map((product) => (
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
