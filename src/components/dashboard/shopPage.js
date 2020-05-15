import React, { useState, useEffect } from "react";
import { axiosWithoutAuth } from "../configurations/axiosConfig";
import ShopCard from "../materialUI/shopCard";
import ProductCard from "../materialUI/productCard";
import { useHistory } from "react-router-dom";
import "../../CSS/shopPage.css";
import DeleteDialog from '../materialUI/deleteDialog'

export default function ShopPage(props) {
  const [shopData, setShopData] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [refresh, setRefresh] = useState(false);
  let shop_id = props.match.params.id;
  const history = useHistory();

  useEffect(() => {
    if (!shopData) {
      getProducts();
    }
    if (!shopData.views) {
      axiosWithoutAuth()
        .get(`/views/${shop_id}`)
        .then((res) => {
          shopData.views = res.data;
          setViewData(res.data);
          setShopData(shopData);
          // props.setNavShop(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  const getProducts = () => {
    axiosWithoutAuth()
      .get(`/shops/${shop_id}`)
      .then((res) => {
        setShopData(res.data);
        res.data.views = viewData
        props.setNavShop(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (refresh) {
    getProducts();
    setRefresh(false);
  }

  const deleteStore = () => {
    axiosWithoutAuth()
      .delete(`/shops/${shopData.id}`)
      .then((res) => {
        console.log(res);
        props.setNavShop(false);
        props.setMessage("Store Deleted");
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="shopContainer">
      {/* <a href={`/shop/${shopData.id}/create_product`}>Create Product</a> */}
      {shopData.views && viewData ? <ShopCard shop={shopData} deleteStore={deleteStore} /> : ""}
      <div className="shopProductsContainer">
        {shopData &&
          shopData.products.map((product) => {
            return <ProductCard product={product} setRefresh={setRefresh} shop={shopData}/>;
          })}
      </div>
    </div>
  );
}
