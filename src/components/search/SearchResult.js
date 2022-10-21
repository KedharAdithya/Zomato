import React from "react";
import Pagination from "./Pagination";
import SearchFoodItems from "./SearchFoodItems";

export default function SearchResult(props) {
  let { searchList } = props;
  let { pageCount } = props;
  let { filterData } = props;
  return (
    <>
      <section className="col-lg-7 col-12 d-flex flex-column align-items-center ms-lg-5 container-fluid">
        {searchList.map((searchList) => {
          return (
            <SearchFoodItems key={searchList._id} searchList={searchList} />
          );
        })}
        <Pagination pageCount={pageCount} filterData={filterData} />
      </section>
    </>
  );
}
