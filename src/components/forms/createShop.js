import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../configurations/axiosConfig";
import { useHistory } from "react-router-dom";
import "../../CSS/createStoreForm.css";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TextField from "@material-ui/core/TextField";

export default function CreateShopForm(props) {
  const [shopInfo, setShopInfo] = useState(false);
  const [file, setFile] = useState(false);
  const [storeLogo, setStoreLogo] = useState(false);
  // const history = useHistory();
  const handleChange = (e) => {
    setShopInfo({
      ...shopInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (file) {
      data.append("file", file);
    }
    data.append("store_url", shopInfo.store_url);
    // data.append("user_id", 3);
    data.append("store_name", shopInfo.store_name);

    axiosWithAuth()
      .post("/shops/", data)
      .then((res) => {
        console.log(res.data);
        props.history.push(`/`);
        props.setMessage(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFile = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    setStoreLogo(URL.createObjectURL(image));
    // setFile(image);
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
    let { store_url, store_name } = shopInfo;
    if (file && store_url && store_name) {
      return false;
    } else {
      return true;
    }
  };
  console.log(shopInfo);
  return (
    <div>
      <h3>CREACT A NEW SHOP </h3>
      <form className="newShopForm" onSubmit={handleSubmit}>
        {storeLogo ? (
          <div>
            <div className="selectedLogoContainer">
              <img src={storeLogo} className="selectedLogo" />
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
              label="Name of your shop"
              variant="filled"
              name="store_name"
              placeholder="Name of Shop"
              onChange={handleChange}
            />
          </div>

          <div className="storeInput">
            <TextField
              id="outlined-basic"
              label="Your Shop Url "
              name="store_url"
              placeholder="Shop url"
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
            Create Shop
          </Button>
          {/* <button>Submit</button> */}
        </div>
      </form>
    </div>
  );
}
