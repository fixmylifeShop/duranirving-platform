import React from "react";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { axiosWithoutAuth } from "../configurations/axiosConfig";
import DeleteDialog from "../materialUI/deleteDialog";

const useStyles = makeStyles({
  root: {
    width: 245,
    maxWidth: 245,
    display: "flex",
    flexDirection: "column",
    margin: 10,
  },
  media: {
    // width: "100%",
    height: 180,
    // backgroundSize:"130% ",
    overflow: "hidden",
  },
  title: {
    height: "50px",
  },
  img: {
    height: 170,
  },
  options: {
    position: "relative",
    background: "white",
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-around",
  },
  textSecondary: {
    // position:"relative",
    textAlign: "left",
    height: "80px",
    overflowY: "auto",
  },
});

export default function ProductCard(props) {
  const classes = useStyles();

  const deleteProduct = () => {
    axiosWithoutAuth()
      .delete(`/shops/products/${props.product.id}`)
      .then((res) => {
        props.setRefresh(true);
        console.log(res);
        // props.setNavShop(false);
        // props.setMessage("Store Deleted")
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card className={classes.root}>
      <CardActionArea href={`/product/${props.product.id}`}>
        <CardMedia
          className={classes.media}
          image={props.product.image}
          title="Contemplative Reptile"
        >
          {/* <img src={props.product.image} className={classes.img} /> */}
        </CardMedia>
        <CardContent>
          <Typography gutterBottom component="h2" className={classes.title}>
            {props.product.product_name.toUpperCase()}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.textSecondary}
          >
            Price: ${props.product.price} <br />
            Description: {props.product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.options}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          href={`/product/${props.product.id}`}
        >
          Edit
        </Button>
        <DeleteDialog
          onClickDelete={deleteProduct}
          title={`Are you sure you want to delete ${
            props.product.product_name
          } from ${props.shop.store_name.toUpperCase()} ?`}
          description="Once you delete a product it's gone forever. If you need to remove 
          it from your shop website temporary, please consider switching it to sold out or 
          hidden in the products options."
        />
      </CardActions>
    </Card>
  );
}
