import React, { useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "../../CSS/navigation.css";
import DashboardIcon from "@material-ui/icons/Dashboard";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HelpIcon from "@material-ui/icons/Help";
import StoreIcon from "@material-ui/icons/Store";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
export default function DashboardNav({ setNavShop, navShop }) {

  return (
    <div className="navContainer">
      <nav>
        <div className="navTitle">DURANIRVING</div>
        <div className="navContent">
          <Link to="/" onClick={() => setNavShop(false)}>
            <p>
              <DashboardIcon className="linkIcon" />
              DASHBOARD
            </p>
          </Link>
          {!navShop ? (
            <Link to="/create_shop">
              <p>
                {" "}
                <StorefrontIcon className="linkIcon" />
                CREATE STORE
              </p>
            </Link>
          ) : (
            <div className="shopOptions">
              <p>
                <ArrowDropDownCircleIcon className="linkIcon" />
                {navShop.store_name.toUpperCase()}
              </p>
              <Link
                to={`/shop/${navShop.id}/create_product`}
                className=" shopOption"
              >
                <p>
                  <AddBoxIcon className="linkIcon" />
                  NEW PRODUCT{" "}
                </p>
              </Link>
            </div>
          )}

          <Link to="/" onClick={() => localStorage.removeItem("token")}>
            <p>
              {" "}
              <ExitToAppIcon className="linkIcon" />
              LOGOUT
            </p>
          </Link>

          <Link to="/">
            <p>
              <HelpIcon className="linkIcon" />
              SUPPORT
            </p>
          </Link>
        </div>
      </nav>
      <div className="navBackgroundSpace" />
    </div>
  );
}
