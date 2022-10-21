import React from "react";

function SearchHeader() {
  return (
    <>
      <header className="bg-danger py-2 d-flex align-items-center justify-content-between">
        <div>
          <div className="brand-logo text-danger bg-light fw-bold d-flex align-items-center ms-lg-5 ms-2 justify-content-center">
            e!
          </div>
        </div>
        <div className="me-lg-5 me-0">
          <button className="btn text-light border-0 me-2 fs-6">login</button>
          <button className="btn btn-outline-light px-4 py-2 fs-6">
            create an account
          </button>
        </div>
      </header>
    </>
  );
}

export default SearchHeader;
