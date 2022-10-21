import React from "react";

export default function SignUp() {
  return (
    <>
      <div
        className="modal"
        id="signup"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="signup-title">
                SignUp
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
                <div className="col-10 d-flex flex-column ">
                  <button>Continue with Gmail</button>
                  <button>Continue with Facebook</button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
