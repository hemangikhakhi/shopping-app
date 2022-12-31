import { Grid } from "@mui/material";
import products from "../data/items.json";
import { ProductItem } from "./ProductItem";

export function ProductsContainer() {
  return (
    <>
      <>
        <h1></h1>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={2} md={4} key={product.id}>
              <ProductItem {...product} />
            </Grid>
          ))}
        </Grid>
      </>
    </>
  );
}
