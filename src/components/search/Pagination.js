import React from "react";

export default function Pagination(props) {
  let { pageCount } = props;
  let { filterData } = props;

  return (
    <>
      <div className="d-flex ">
        {Array(pageCount)
          .fill(1)
          .map((value, index) => {
            return (
              <button
                className="btn btn-outline-secondary me-2"
                key={index}
                onClick={(event) => filterData(event, "page")}
                value={index + 1}
              >
                {index + 1}
              </button>
            );
          })}
      </div>
    </>
  );
}
