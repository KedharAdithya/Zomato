import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchFoodItems(props) {
  let { searchList } = props;
  let navigate = useNavigate();
  let goToRestaurant = (id) => {
    navigate("/restaurant/" + id);
  };
  return (
    <>
      <div
        className="col-12 food-shadow p-4 mb-4 "
        onClick={() => goToRestaurant(searchList._id)}
      >
        <div className="d-flex align-items-center">
          <img
            src={`../image/${searchList.image}`}
            alt=" "
            className="food-item"
          />
          <div className="ms-5">
            <p className="h4 fw-bold">{searchList.name}</p>
            <span className="fw-bold "> {searchList.city}</span>
            <p className="m-0 text-muted">
              {searchList.locality}
            </p>
          </div>
        </div>
        <div className="hrline">
          <hr />
        </div>
        <div className="d-flex flex-row">
          <div>
            <p className="m-0">CUISINES:</p>
            <p className="m-0">COST FOR TWO:</p>
          </div>
          <div className="ms-5">
            <p className="m-0 fw-bold">
              {searchList.cuisine
                .reduce((pv, cv) => pv + ", " + cv.name, "")
                .substring(2)}
            </p>
            <p className="m-0 fw-bold">
              <i className="fa fa-inr" aria-hidden="true"></i>
              {searchList.min_price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
