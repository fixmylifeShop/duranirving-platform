import React, { useState } from "react";
import { axiosWithoutAuth } from "../configurations/axiosConfig";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../../CSS/productPage.css";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { axiosWithAuth } from "../configurations/axiosConfig";
import TextField from "@material-ui/core/TextField";
import DeleteDialog from "../materialUI/deleteDialog";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
export default function ProductPage(props) {
  const [product, setProduct] = useState(false);
  const [image, setImage] = useState(false);
  const [edit, setEdit] = useState(false);
  const [changes, setChanges] = useState(false);
  const history = useHistory();
  const id = props.match.params.id;

  const getProductData = () => {
    axiosWithoutAuth()
      .get(`/shops/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        if (!image) {
          setImage(res.data.images[0]);
        }
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (!product) {
    getProductData();
  }
  const handleFile = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    if (image) {
      const fileType = image["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        const data = new FormData();
        data.append("file", image);
        data.append("product_id", id);
        axiosWithAuth()
          .post("/shops/images", data)
          .then((res) => {
            console.log(res.data);
            setImage(res.data);
            getProductData();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("error");
      }
    }
  };

  const deleteImage = (photo_id) => {
    axiosWithAuth()
      .delete(`/shops/images/${photo_id}`)
      .then(() => {
        getProductData();
        setImage(product.images[0]);
      })
      .catch((err) => console.log(err));
  };

  const currency = (number) => {
    const currency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
    return currency.format(number);
  };

  const disable = () => {
    if (changes) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .put(`/shops/products/${id}`, changes)
      .then((res) => {
        console.log(res.data);
        getProductData();
        setEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setChanges({
      ...changes,
      [e.target.name]: e.target.value,
    });
  };
  console.log(product);
  return (
    <div className="productContainer">
      <div className="backToShopButton">
        <Button
          // variant="outlined"
          color="primary"
          onClick={() => history.push(`/shop/${product.shop_id}`)}
        >
          <KeyboardBackspaceIcon /> Back to Shop
        </Button>
      </div>

      {product ? (
        <div className="editProductContainer">
          <div className="productImageContainer">
            {image ? (
              <div className="productImage">
                <img src={image.image} alt="product" />
                {product.images.length === 1 ? (
                  ""
                ) : (
                  <div className="imageDeleteButton">
                    <DeleteDialog
                      onClickDelete={() => deleteImage(image.id)}
                      buttonName="Delete image"
                      title={`Are you sure you want to delete this image ?`}
                      description="You are about to permanently delete this image."
                    />
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
            <div className="imageOptionContainer">
              {console.log(image)}
              {product &&
                product.images.map((options) => {
                  return (
                    <div
                      className={`imagesContainer ${
                        image.image === options.image ? "selectedImage" : ""
                      }`}
                      onClick={() => setImage(options)}
                    >
                      <img
                        src={options.image}
                        alt="product"
                        className={`imagesOptions`}
                      />
                    </div>
                  );
                })}
              {product.images.length < 5 ? (
                <div className="addPhotoContainer">
                  <input
                    accept="image/*"
                    className="hiddenInput"
                    onChange={handleFile}
                    id="icon-button-file"
                    type="file"
                  />
                  <label
                    htmlFor="icon-button-file"
                    className="addProductPhotoButton"
                  >
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <AddCircleIcon fontSize="large" />
                    </IconButton>
                  </label>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {edit ? (
            <div className="productInfoContainer">
              <div className="cancalUpdateButton">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setEdit(false)}
                >
                  cancel
                </Button>
              </div>

              <TextField
                id="outlined-basic"
                label="$"
                name="price"
                defaultValue={product.price}
                placeholder="price"
                onChange={handleChange}
                variant="filled"
              />
              <TextField
                id="outlined-basic"
                label="Product Name"
                variant="filled"
                name="product_name"
                defaultValue={product.product_name}
                placeholder="Name of Product"
                onChange={handleChange}
              />
              <TextField
                id="filled-multiline-static"
                label="Multiline"
                multiline
                rows={6}
                label="Description "
                name="description"
                placeholder="description"
                defaultValue={product.description}
                onChange={handleChange}
                variant="filled"
              />
              <Button
                variant="contained"
                color="primary"
                disabled={disable()}
                onClick={handleSubmit}
              >
                Update
              </Button>
            </div>
          ) : (
            <div className="productInfoContainer">
              <div className="cancalUpdateButton">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setEdit(true)}
                >
                  edit
                </Button>{" "}
              </div>
              <div className="product-price-title">
                <p>
                  Price:
                  <p className="product-price">{currency(product.price)}</p>
                </p>

                <p>
                  Product Name:
                  <p className="product-name">
                    {product.product_name.toUpperCase()}
                  </p>
                </p>
              </div>
              <div className="descriptionContainer">
                <p className="title">Description: </p>
                <p className="descriptionParagraph">{product.description}</p>
              </div>{" "}
            </div>
          )}
        </div>
      ) : (
        " loading "
      )}
    </div>
  );
}
