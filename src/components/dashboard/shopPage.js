import React, { useState, useEffect } from "react";
import { axiosWithoutAuth } from "../configurations/axiosConfig";
import ShopCard from "../materialUI/shopCard";
import ProductCard from "../materialUI/productCard";
import { useHistory } from "react-router-dom";
import "../../CSS/shopPage.css";

export default function ShopPage(props) {
  const [shopData, setShopData] = useState(false);
  const [viewData, setViewData] = useState(false);
  let shop_id = props.match.params.id;
  const history = useHistory();

  useEffect(() => {
    if (!shopData) {
      axiosWithoutAuth()
        .get(`/shops/${shop_id}`)
        .then((res) => {
          setShopData(res.data);
          props.setNavShop(res.data);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
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

  const deleteStore = () => {
    axiosWithoutAuth()
      .delete(`/shops/${shopData.id}`)
      .then((res) => {
        history.push("/");
        props.setNavShop(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="shopContainer">
      {/* <a href={`/shop/${shopData.id}/create_product`}>Create Product</a> */}
      {viewData ? (
        <ShopCard shop={shopData} deleteStore={deleteStore} />
      ) : (
        ""
      )}
      <div className="shopProductsContainer">
        {shopData &&
          shopData.products.map((product) => {
            return <ProductCard product={product} />;
          })}
      </div>
    </div>
  );
}
