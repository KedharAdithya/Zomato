import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

function Wallpaper() {
  let locRef = useRef();
  let [locList, setLocList] = useState([]);
  let [restaurantList, setRestList] = useState([]);
  let [selectLoc, setSelectLoc] = useState(null);
  let [resDisable, setResDisabled] = useState(true);
  let navigate = useNavigate();
  // for location

  let getLocationList = async (event) => {
    let city = event.target.value;
    setSelectLoc(null);
    setResDisabled(true);
    if (city === "" || city.length < 2) {
      setLocList([]);
      return false;
    }
    let URL =
      "https://zomato-clone-api-2.herokuapp.com/api/get-location-by-city?name=" +
      city;
    try {
      let response = await axios.get(URL);
      let { locationList } = response.data;
      setLocList([...locationList]);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  let selectLocation = (locationList) => {
    locationList = JSON.parse(locationList);
    setSelectLoc({ ...locationList });
    setResDisabled(false);
    setLocList([]);
    locRef.current.value = `${locationList.name}, ${locationList.city}. `;
  };
  let goToRestaurant = (id) => {
    navigate("/restaurant/" + id);
  };
  // for restaurant right search bar
  let getRestaurantDetails = async (event) => {
    let restaurant = event.target.value;

    if (restaurant === "" || restaurant.length < 2) {
      setRestList([]);
      return false;
    }
    let URL = `https://zomato-clone-api-2.herokuapp.com/api/get-restaurant-by-location-id/?lid=${selectLoc.location_id}&rest=${restaurant}`;

    try {
      let response = await axios.get(URL);
      let { result } = response.data;
      setRestList([...result]);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  return (
    <>
      <section className="row main-section align-content-start ">
        <Header bgColor="" />
        <section className="col-12 d-flex flex-column align-items-center justify-content-center">
          <p className="brand-name fw-bold my-lg-2 mb-0">e!</p>
          <p className="h2 text-white my-3 text-center">
            Find the best restaurants, cafes, and bars
          </p>
          <div className="search w-50 d-flex mt-3">
            <div className="d-flex d- flex-column position-relative me-3">
              <input
                type="text"
                className="form-control mb-3 mb-lg-0 w-50 me-lg-3 py-2 px-3 w-100"
                placeholder="Please type a location"
                onChange={getLocationList}
                ref={locRef}
              />
              <ul
                className="list-group position-absolute w-100 suggestion"
                style={{ top: "100%" }}
              >
                {locList.map((locationList) => {
                  return (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-start suggestion-list"
                      key={locationList._id}
                      onClick={() =>
                        selectLocation(`${JSON.stringify(locationList)}`)
                      }
                    >
                      <div className="ms-2 me-auto text-muted">
                        <div className="">
                          {locationList.name}, {locationList.city}.
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="d-flex w-100 flex-column position-relative">
              <div className="w-100 input-group  ">
                <span className="input-group-text bg-white">
                  <i className="fa fa-search text-primary"></i>
                </span>
                <input
                  type="text"
                  className="form-control py-2 px-3"
                  placeholder="Search for restaurants"
                  onChange={getRestaurantDetails}
                  disabled={resDisable}
                />
              </div>
              <ul
                className="list-group position-absolute w-100 suggestion"
                style={{ top: "100%" }}
              >
                {restaurantList.map((restaurant) => {
                  return (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-start suggestion-list"
                      key={restaurant._id}
                      onClick={() => goToRestaurant(restaurant._id)}
                    >
                      <div className="restaurant-suggestion d-flex">
                        <img
                          src={`./image/${restaurant.image}`}
                          alt=""
                          className="me-3"
                        />
                        <div className="d-flex flex-column">
                          <p className="mb-0 fw-bold nav-blue">
                            {restaurant.name}
                          </p>
                          <span className="small text-muted gap-1">
                            {restaurant.locality} , {restaurant.city}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Wallpaper;
