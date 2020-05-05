import React, { useState, useEffect } from "react";
import { axiosWithoutAuth } from "../configurations/axiosConfig";

import ProductCard from "../materialUI/productCard";
export default function ShopPage(props) {
  const [shopData, setShopData] = useState(false);
  let shop_id = props.match.params.id;

  useEffect(() => {
    if (!shopData) {
      axiosWithoutAuth()
        .get(`/shops/${shop_id}`)
        .then((res) => {
          setShopData(res.data);
          props.setNavShop(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return (
    <div>
      <a href={`/shop/${shopData.id}/create_product`}>Create Product</a>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {shopData &&
          shopData.products.map((product) => {
            return <ProductCard product={product} />;
          })}
      </div>
    </div>
  );
}
