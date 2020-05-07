import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../configurations/axiosConfig";

export default function CreateProductForm(props) {
  const [productInfo, setProductInfo] = useState(false);
  const [file, setFile] = useState(false);
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
  console.log(productInfo);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <img />
        <input
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
        <input type="file" onChange={handleFile} />
        <button>Submit</button>
      </form>
    </div>
  );
}
