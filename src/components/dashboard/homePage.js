import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../configurations/axiosConfig";
import ShopCard from "../materialUI/shopCard";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import "../../CSS/dashboard.css";
import DashboardNav from "../navigation/dashboardNav";
import ShopPage from "./shopPage";
import ProductPage from "./productPage";

import CreateShopForm from "../forms/createShop";
import CreateProductForm from "../forms/createProduct";

export default function HomePage(props) {
  const [userShops, setUserShops] = useState(false);
  const [navShop, setNavShop] = useState(false);
  const [message, setMessage] = useState(false);
  const [orders, setOrders] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    getReq();
  }, [pathname]);

  const getReq = () => {
    axiosWithAuth()
      .get("/shops/logged/user")
      .then((res) => {
        setUserShops(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axiosWithAuth()
      .get("/orders/user/")
      .then((res) => {
        // setUserShops(res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(message);
  const messageContent = () => {
    if (message === "Store Deleted") {
      return <h3 className="message deleted"> {message.toUpperCase()}</h3>;
    }
    if (message === "Product Added To Shop") {
      return <h3 className="message created">{message.toUpperCase()}</h3>;
    }
    if (message === "New Store Created") {
      return <h3 className="message created">{message.toUpperCase()}</h3>;
    }
  };
  return (
    <div className="dashboard">
      <DashboardNav navShop={navShop} setNavShop={setNavShop} />
      <div className="dashboardContent">
        {/* <Switch> */}
        <div className="alert">{messageContent()}</div>
        <Route exact path="/">
          {/* home <Link to="/create_shop">Create store</Link>{" "} */}
          <div className="shopsContainer">
            {userShops &&
              userShops.map((shop) => {
                return <ShopCard shop={shop} setNavShop={setNavShop} />;
              })}
          </div>
        </Route>
        <Route
          path="/create_shop"
          component={(props) => (
            <CreateShopForm {...props} setMessage={setMessage} />
          )}
        />
        <Route
          exact
          path="/shop/:id"
          render={(props) => (
            <ShopPage
              {...props}
              setNavShop={setNavShop}
              setMessage={setMessage}
            />
          )}
        />
        <Route
          path="/shop/:id/create_product"
          component={(props) => (
            <CreateProductForm {...props} setMessage={setMessage} />
          )}
          // setMessage={setMessage}
        />
        <Route path="/product/:id" component={ProductPage} />
        {/* </Switch> */}
      </div>
    </div>
  );
}
