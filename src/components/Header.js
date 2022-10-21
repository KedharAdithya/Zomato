import React, { useEffect } from "react";
import Swal from "sweetalert2";
import Login from "../components/user/Login";
import SignUp from "../components/user/SignUp";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import jwt_decode from "jwt-decode";

export default function Header(props) {
  let { bgColor } = props;
  let [UserLogin, setUserLogin] = useState(null);
  let onSuccess = (response) => {
    let token = response.credential;
    localStorage.setItem("Auth_Token", token);

    Swal.fire({
      icon: "success",
      title: "Login Successful",
    }).then(() => {
      window.location.reload();
    });
  };
  let userLogout = () => {
    Swal.fire({
      title: "Are you sure to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("Auth_Token");
        window.location.reload();
      }
    });
  };
  let onError = () => {
    alert("something went wrong try again");
  };
  useEffect(() => {
    let token = localStorage.getItem("Auth_Token");
    if (token) {
      var decoded = jwt_decode(token);
      setUserLogin(decoded);
    } else {
      setUserLogin(null);
    }
  }, []);
  return (
    <>
      <GoogleOAuthProvider clientId="772391917080-4q579f4asm5k852v2mo6eod2p74e3ui0.apps.googleusercontent.com">
        <header className={"col-12 mb-4 " + bgColor}>
          <Login success={onSuccess} error={onError} />
          <SignUp />
          <section className="d-flex justify-content-between align-items-center py-1 px-4 me-3  ">
            <div className="brand-logo text-danger bg-light fw-bold d-flex align-items-center ms-lg-5 ms-2 justify-content-center">
              e!
            </div>

            {UserLogin === null ? (
              <div>
                <button
                  className=" text-light btn border-0"
                  data-bs-toggle="modal"
                  data-bs-target="#login"
                >
                  Login
                </button>
                <button
                  className="btn btn-outline-light ms-2"
                  data-bs-toggle="modal"
                  data-bs-target="#signup"
                >
                  Create an account
                </button>
              </div>
            ) : (
              <div>
                <span className="btn text-light btn border-0">
                  Welcome, {UserLogin.name}
                </span>
                <button
                  className="btn btn-outline-warning"
                  onClick={userLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </section>
        </header>
      </GoogleOAuthProvider>
    </>
  );
}
