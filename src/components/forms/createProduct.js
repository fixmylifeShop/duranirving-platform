import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../configurations/axiosConfig";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
export default function CreateProductForm(props) {
  const [productInfo, setProductInfo] = useState(false);
  const [file, setFile] = useState(false);
  const [productImage, setProductImage] = useState(false);

  const shop_id = props.match.params.id;
  console.log(shop_id);
  const handleChange = (e) => {
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (file) {
      data.append("file", file);
    }
    data.append("shop_id", shop_id);
    data.append("description", productInfo.description);
    data.append("product_name", productInfo.product_name);
    data.append("price", productInfo.price);

    axiosWithAuth()
      .post("/shops/products", data)
      .then((res) => {
        console.log(res.data);
        props.history.push(`product/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFile = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    setProductImage(URL.createObjectURL(image));
    setFile(image);
    if (image) {
      const fileType = image["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        // setError("");
        setFile(image);
        console.log(file);
      } else {
        console.log("error");
        // setError("error please upload a image file");
      }
    }
  };

  const disable = () => {
    let { product_name, description, price } = productInfo;
    if ((file && product_name && description, price)) {
      return false;
    } else {
      return true;
    }
  };
  console.log(props);
  return (
    <div>
      <h3>ADD A NEW PRODUCT OR SERVICE </h3>

      <form
        // style={{ display: "flex", flexDirection: "column" }}
        className="newShopForm"
        onSubmit={handleSubmit}
      >
        {productImage ? (
          <div>
            <div className="selectedLogoContainer">
              <img src={productImage} className="selectedLogo" />
              <input
                accept="image/*"
                className="hiddenInput"
                onChange={handleFile}
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <Button
                  variant="contained"
                  // color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  Change Image
                </Button>
              </label>
            </div>
          </div>
        ) : (
          <div className="shopLogocontainer">
            <input
              accept="image/*"
              className="hiddenInput"
              onChange={handleFile}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file" className="addLogoButton">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <AddCircleIcon />
              </IconButton>
            </label>
          </div>
        )}
        <div className="textContainers">
          <div className="storeInput">
            <TextField
              id="outlined-basic"
              label="Product Name"
              variant="filled"
              name="product_name"
              placeholder="Name of Product"
              onChange={handleChange}
            />
          </div>

          <div className="storeInput">
            <TextField
              id="outlined-basic"
              label="Description "
              name="description"
              placeholder="description"
              onChange={handleChange}
              variant="filled"
            />
          </div>
          <div className="storeInput">
            <TextField
              id="outlined-basic"
              label="$"
              name="price"
              placeholder="price"
              onChange={handleChange}
              variant="filled"
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            disabled={disable()}
            onClick={handleSubmit}
          >
            Create Product
          </Button>
          {/* <button>Submit</button> */}
        </div>
        {/* <input
          name="product_name"
          placeholder="Name of Product"
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="description"
          onChange={handleChange}
        />
        <input name="price" placeholder="price" onChange={handleChange} />
        <button>Submit</button> */}
      </form>
    </div>
  );
}
