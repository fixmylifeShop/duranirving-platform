import React from "react";
import Button from "@material-ui/core/Button";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";

export default function ShopCard(props) {
  const shop = props.shop;

  const roundCount = (value) => {
    if (value > 1000) {
      return Math.round(value / 1000) + "K*";
    } else {
      return value;
    }
  };
  const data = {
    visitors: {
      labels: shop.views.view_years,
      datasets: [
        {
          label: "visitors",
          backgroundColor: "#3FADAA",
          data: shop.views.view_data,
        },
      ],
    },
  };

  return (
    <div className="shopCard">
      <div className="leftCardContent">
        <div className="logoContainer">
          <img src={shop.store_logo} />
        </div>
        <div className="buttonContainer">
          <Link to={`/shop/${props.shop.id}`}>
            <Button
              variant="contained"
              size="small"
              // color="primary"

              onClick={() => {
                props.setNavShop(shop);
              }}
            >
              Edit
            </Button>
          </Link>

          <Button
            variant="contained"
            size="small"
            // color="primary"
            target="_blank"
            href={`https://www.${props.shop.store_url}`}
          >
            View Site
          </Button>
        </div>

        {/* <div></div> */}
      </div>
      <div className="middleCardContent">
        <Line
          options={{
            responsive: true,
            legend: {
              display: false,
            },
            scales: {
              yAxes: [
                {
                  display: false,
                },
              ],
            },
          }}
          data={data.visitors}
        />
      </div>
      <div className="rightCardContent">
        <div>
          <h3>{shop.store_name.toUpperCase()}</h3>
          <h4>
            {shop.views.view_years[0] +
              " - " +
              shop.views.view_years[shop.views.view_years.length - 1]}
          </h4>
          <div>
            <h4 style={{ margin: "0" }}>Visitors </h4>
            <p style={{ margin: "0" }}>
              {roundCount(shop.views.total_views || 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
