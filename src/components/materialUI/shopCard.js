import React from "react";
import Button from "@material-ui/core/Button";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { axiosWithoutAuth } from "../configurations/axiosConfig";
import DeleteDialog from "../materialUI/deleteDialog";

export default function ShopCard(props) {
  const shop = props.shop;
  const history = useHistory();
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

  const deleteStore = () => {
    axiosWithoutAuth()
      .delete(`/shops/${shop.id}`)
      .then((res) => {
        console.log(res);
        // props.setNavShop(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(shop);
  return (
    <div className="shopCard">
      <div className="leftCardContent">
        <div className="logoContainer">
          <img src={shop.store_logo} />
        </div>
        {props.deleteStore ? (
          <DeleteDialog
            onClickDelete={deleteStore}
            title={`Are you sure you want to delete ${shop.store_name.toUpperCase()} ?`}
            description="Once you delete a shop it's gone forever. This means if you currently have it connected to a front-end website the data will be lost and you have to set it to another shop."
          />
        ) : (
          <div className="buttonContainer">
            {/* <Link to={`/shop/${props.shop.id}`}> */}
            <Button
              variant="contained"
              size="small"
              // color="primary"

              onClick={() => {
                props.setNavShop(shop);
                history.push(`/shop/${props.shop.id}`);
              }}
            >
              View
            </Button>
            {/* </Link> */}
            <Button
              variant="contained"
              size="small"
              // color="primary"
              target="_blank"
              href={`https://www.${props.shop.store_url}`}
            >
              Visit Shop
            </Button>
          </div>
        )}
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
          <h5>{shop.store_name.toUpperCase()}</h5>
          <h6>
            {shop.views.view_years[0] +
              " - " +
              shop.views.view_years[shop.views.view_years.length - 1]}
          </h6>
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
