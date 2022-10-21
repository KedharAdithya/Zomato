import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../Header";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Restaurant() {
  const emailRef = useRef();
  let params = useParams();
  let initRestaurant = {
    aggregate_rating: 0,
    city: "",
    city_id: 0,
    contact_number: 0,
    cuisine: [],
    cuisine_id: [],
    image: "",
    locality: "",
    location_id: 0,
    mealtype_id: 0,
    min_price: 0,
    name: "",
    rating_text: "",
    thumb: [],
    _id: "-1",
  };
  let [rDetails, setRestDetails] = useState({ ...initRestaurant });
  let [isContact, setIsContact] = useState(false);
  let [menuItem, setMenuItem] = useState([]);
  let [subTotal, setSubtotal] = useState(0);

  // let onChangeHandler = () => {};

  let loadScript = async () => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://checkout.razorpay.com/v1/checkout.js";
    scriptElement.onload = () => {
      return true;
    };
    scriptElement.onerror = () => {
      return false;
    };
    document.body.appendChild(scriptElement);
  };

  let makePayment = async () => {
    let isLoaded = await loadScript();
    if (isLoaded === false) {
      alert("Unable load payment sdk");
      return false;
    }

    let URL = "https://zomato-clone-api-2.herokuapp.com/api/payment";
    let sendData = {
      amount: subTotal,
      email: emailRef.current.value,
    };

    let { data } = await axios.post(URL, sendData);
    let { order } = data;

    var options = {
      key: "rzp_test_acWoqsX0P1QU3u",
      amount: order.amount,
      currency: "INR",
      name: "Zomato Clone Payment",
      description: "This is a food payment",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/2d/Zomato_Logo.jpg",
      order_id: order.id,
      handler: async function (response) {
        let URL = "https://zomato-clone-api-2.herokuapp.com/api/callback";
        let sendData = {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
        };

        let { data } = await axios.post(URL, sendData);
        if (data.status === true) {
          Swal.fire({
            icon: "success",
            title: "Payment Successful",
          }).then(() => {
            window.location.assign("/"); 
          });
        } else {
          alert("payment fails, try again.");
        }
      },
      prefill: {
        name: "Kedhara Adithya Vardhan",
        email: "kedhar.kambhampati@gmail.com",
        contact: "9056475389",
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  let getRestaurantDetails = async () => {
    let URL =
      "https://zomato-clone-api-2.herokuapp.com/api/get-restaurant-by-id/" +
      params.id;
    try {
      let response = await axios.get(URL);
      let data = response.data;

      if (data.status === true) {
        setRestDetails({ ...data.result });
      } else {
        setRestDetails({ ...initRestaurant });
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  let getMenuList = async () => {
    let URL =
      "https://zomato-clone-api-2.herokuapp.com/api/get-menuitems?resid=" +
      params.id;
    try {
      let response = await axios.get(URL);
      let data = response.data;

      if (data.status === true) {
        setMenuItem([...data.menu_items]);
      } else {
        alert("menu not found");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  useEffect(() => {
    getRestaurantDetails();
  }, []);

  useEffect(() => {
    let Subtotal = menuItem.reduce((pValue, cValue) => {
      return pValue + cValue.price * cValue.qty;
    }, 0);
    setSubtotal(Subtotal);
  }, [menuItem]);

  let incMenuitemCounter = (index) => {
    let _menuItem = [...menuItem];
    _menuItem[index].qty += 1;
    setMenuItem(_menuItem);
  };
  let decMenuitemCounter = (index) => {
    let _menuItem = [...menuItem];
    _menuItem[index].qty -= 1;
    setMenuItem(_menuItem);
  };

  return (
    <>
      <div
        className="modal fade"
        id="slidShow"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" style={{height:"75vh"}}>
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="staticBackdropLabel"
              >
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close" data-bs-dismiss="modal" aria-label="Close">
              </button>
            </div>
            <div className="modal-body mb-0">
              <Carousel showThumbs={false} infiniteLoop={true}>
                {rDetails.thumb.map((value, index) => {
                  return (
                    <div key={index} className=" h-20 w-100">
                      <img
                        src={"../image/" + value}
                        alt=" "
                        className=" "
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>

    

      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4
                className="modal-title  fw-bold"
                id="exampleModalToggleLabel"
              >
                {rDetails.name}
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>


            <div className="modal-body">
              {menuItem.map((menuItems, index) => {
                return (
                  <div
                    className="row border-bottom border-2 p-1 py-3"
                    key={menuItems._id}
                  >
                    <div className="col-8 small">
                      <p className="mb-1 fw-bold h6 ">
                        {menuItems.name}
                      </p>
                      <p className="mb-1">{menuItems.price}</p>
                      <p className="small text-muted">
                        {menuItems.description}
                      </p>
                    </div>
                    <div className="col-4 d-flex justify-content-end mb-3">
                      <div className="menu-food-item">
                        <img src={`../image/${menuItems.image}`} alt="" />
                        {menuItems.qty === 0 ? (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => incMenuitemCounter(index)}
                          >
                            Add
                          </button>
                        ) : (
                          <div className="order-item-count add">
                            <span
                              className="span-button text-black"
                              onClick={() => decMenuitemCounter(index)}
                            >
                              -
                            </span>
                            <span>{menuItems.qty}</span>
                            <span
                              className="span-button text-black"
                              onClick={() => incMenuitemCounter(index)}
                            >
                              +
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {subTotal === 0 ? null : (
                <div className=" d-flex justify-content-between mt-2">
                  <h4 className="fw-bold">Subtotal Rs {subTotal} </h4>
                  <button
                    className="btn btn-danger bg-danger"
                    data-bs-target="#exampleModalToggle2"
                    data-bs-toggle="modal"
                  >
                    Pay Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4
                className="modal-title  fw-bold"
                id="exampleModalToggleLabel2"
              >
                {rDetails.name}
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
           
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label "
                    value="Kedhara Adithya Vardhan"
                    
                  >
                    Name
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label "
                    value="kedhar.kambhampati@gmail.com"
                    ref={emailRef}
                    
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your Email"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label "
                    value="Delhi"
              
                  >
                    Address
                  </label>
                  <textarea
                    className="form-control "
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Enter your address"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success bg-success"
                  onClick={makePayment}
                >
                  PROCEED
                </button>
              </div>
            
          </div>
        </div>
      </div>


      <Header bgColor="bg-danger" />


      <section className="row justify-content-center">
        <div className="col-10">
          <div className="row ">
            <div className="col-12 mt-4">
              <div className="restaurant-image position-relative">
                <img src={`../image/${rDetails.image}`} alt="" />
                <button
                  type="button"
                  className="btn btn-outline-light position-absolute btn-gallery"
                  data-bs-toggle="modal"
                  data-bs-target="#slidShow"
                >
                  Click to get image Gallery
                </button>
              </div>
            </div>
            <div className="col-12">
              <h3 className=" mt-4 fw-bold">{rDetails.name}</h3>
              <div className="d-flex justify-content-between mt-4">
                <ul className="list-unstyled d-flex gap-4  fw-bold mb-0 cursor-pointer">
                  <li
                    className={
                      isContact === true
                        ? null
                        : "border-bottom border-3 border-danger "
                    }
                    onClick={() => setIsContact(false)}
                  >
                    Overview
                  </li>
                  <li
                    className={
                      isContact === false
                        ? null
                        : "border-bottom border-3 border-danger"
                    }
                    onClick={() => setIsContact(true)}
                  >
                    Contact
                  </li>
                </ul>
                <button
                  data-bs-toggle="modal"
                  href="#exampleModalToggle"
                  role="button"
                  className="btn btn-danger bg-danger align-self-start mb-2"
                  onClick={getMenuList}
                >
                  Place Online Order
                </button>
              </div>
              <hr className="mt-0" />
              {isContact === false ? (
                <div className="over-view mt-3">
                  <p className=" h5 fw-bold mb-3">About this Place</p>

                  <p className=" fw-bold mb-0">Cuisine</p>
                  <p className="text-muted">
                    {rDetails.cuisine
                      .reduce((pv, cv) => pv + ", " + cv.name, "")
                      .substring(2)}
                  </p>

                  <p className=" mt-3 fw-bold mb-0">Average Cost</p>
                  <p className="text-muted">
                    {rDetails.min_price} for two people (approx.)
                  </p>
                </div>
              ) : (
                <div className="contact mt-3 mb-5">
                  <p className=" fw-bold mb-0">Phone Number</p>
                  <p className="text-danger">+{rDetails.contact_number}</p>

                  <p className=" mt-3 fw-bold mb-0">Address</p>
                  <p className="text-muted col-4">
                    {rDetails.locality}, {rDetails.city}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
