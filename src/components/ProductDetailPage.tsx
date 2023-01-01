import { Dialog, DialogTitle, Divider, Typography } from "@mui/material";
import classnames from "classnames";
import { useProductDetailStyle } from "../css/productDetils";
import products from "../data/items.json";

type ProductDetailPageProps = {
  isOpen: boolean;
  handleClose: () => void;
  id: number;
};

const OfferDiv = ({ name, description, classes }) => {
  const style = useProductDetailStyle();
  return (
    <div className={classes}>
      <Typography variant="body2">{name}</Typography>
      {description && (
        <Typography variant="body2" className={style.offerDescription}>
          {description}
        </Typography>
      )}
    </div>
  );
};

export function ProductDetailPage({
  isOpen,
  id,
  handleClose,
}: ProductDetailPageProps) {
  const style = useProductDetailStyle();
  const details = products.find((p) => p.id === id);

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md">
      <DialogTitle>Product Detail Page</DialogTitle>
      <div className={style.container}>
        <div>
          <img src={details?.imgUrl} alt="product"></img>
        </div>
        <div className={style.detailContainer}>
          <Typography variant="subtitle1" className={style.titleFont}>
            {details?.description.displayName}
          </Typography>
          <Divider />
          <Typography
            variant="subtitle1"
            className={style.titleFont}
          >{`US$${details?.price}`}</Typography>
          <Typography variant="subtitle2">
            {details?.description.taxDetails}
          </Typography>
          <Divider />
          <div className={style.offerContainer}>
            {details?.description.offers.map((offer) => {
              return (
                <OfferDiv
                  name={offer.name}
                  description={offer.description}
                  classes={style.offerDiv}
                />
              );
            })}
          </div>
          <Typography variant="subtitle2">
            Brand: {details?.description.brand}
          </Typography>
          <Typography variant="subtitle2">
            ModelName: {details?.description.model}
          </Typography>
          <div className={style.offerContainer}>
            {details?.description.variant.map((des) => {
              return (
                <OfferDiv
                  name={des.name}
                  description=""
                  classes={classnames(style.offerDiv, style.variantDiv)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
