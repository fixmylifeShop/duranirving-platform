import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../configurations/axiosConfig";
import ShopCard from "../materialUI/shopCard";
import { Route, Switch, Link } from "react-router-dom";
import "../../CSS/dashboard.css";
import DashboardNav from "../navigation/dashboardNav";
import ShopPage from "./shopPage";
import ProductPage from "./productPage";

import CreateShopForm from "../forms/createShop";
import CreateProductForm from "../forms/createProduct";

export default function HomePage(props) {
  const [userShops, setUserShops] = useState(false);
  const [navShop, setNavShop] = useState(false);

  useEffect(() => {
    // if (props.params.match.id) {

    // }
    // setNavShop(false);
  });
  const getReq = () => {
    if (!userShops) {
      axiosWithAuth()
        .get("/shops/logged/user")
        .then((res) => {
          setUserShops(res.data);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          console.log(err);
        });
    }
  };
  console.log("nav shop", navShop);
  useEffect(() => {
    getReq();
  });

  console.log(userShops);
  return (
    <div className="dashboard">
      <DashboardNav navShop={navShop} setNavShop={setNavShop}/>
      <div className="dashboardContent">
        {/* <Switch> */}
        <Route exact path="/">
          {/* home <Link to="/create_shop">Create store</Link>{" "} */}
          <div className="shopsContainer">
            {userShops &&
              userShops.map((shop) => {
                return <ShopCard shop={shop} setNavShop={setNavShop} />;
              })}
          </div>
        </Route>
        <Route path="/create_shop" component={CreateShopForm} />
        <Route
          exact
          path="/shop/:id"
          render={(props) => <ShopPage {...props} setNavShop={setNavShop} />}
        />
        <Route path="/shop/:id/create_product" component={CreateProductForm} />
        <Route path="/product/:id" component={ProductPage} />
        {/* </Switch> */}
      </div>
    </div>
  );
}
