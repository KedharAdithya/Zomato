import React from "react";
import { GoogleLogin } from "@react-oauth/google";

export default function Login(props) {
  let { success } = props;
  let { error } = props;

  return (
    <>
      <div
        className="modal fade"
        id="login"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="login-title">
                Login
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row justify-content-center">
                <div className="col-12 d-flex justify-content-center align-items-center flex-column py-3">
                  <div className="  ">
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        success(credentialResponse);
                      }}
                      onError={() => {
                        error();
                      }}
                      width={100}
                      shape={"none"}
                    />
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="d-flex justify-content-center col-12">
                <p>
                  Don't have an account?
                  <a href="localhost:3000" className="text-danger ms-1 ">
                    SignUp
                    ;
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
