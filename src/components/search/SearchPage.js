import SearchFilter from "./SearchFilter";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchResult from "./SearchResult";
import { useSearchParams } from "react-router-dom";
import Header from "../Header";

function SearchPage() {
  let [searchParams] = useSearchParams();
  let [filter, setFilter] = useState({});
  let [searchList, setSearchList] = useState([]);
  let [LocationList, setLocationList] = useState([]);
  let [pageCount, setPageCount] = useState(0);

  let getFilterDetails = async (_filter) => {
    _filter = { ..._filter };
    let URL = "https://zomato-clone-api-2.herokuapp.com/api/filter";

    // filter //

    if (searchParams.get("meal_type"))
      _filter["mealtype"] = searchParams.get("meal_type");

    try {
      let response = await axios.post(URL, _filter);
      let data = response.data;
      let pageCount = response.data;
      setSearchList([...data.result]);
      setPageCount(pageCount.PageCount);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  let getLocationList = async () => {
    let URL = "https://zomato-clone-api-2.herokuapp.com/api/get-location";
    try {
      let response = await axios.get(URL);
      let data = response.data;
      setLocationList([...data.locationList]);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  let filterData = (event, option) => {
    let { value } = event.target;
    let _filter = {};
    switch (option) {
      case "location":
        _filter["location"] = value;
        break;
      case "sort":
        _filter["sort"] = value;
        break;
      case "cost":
        let cost = value.split("-");
        _filter["lcost"] = cost[0];
        _filter["hcost"] = cost[1];
        break;

      case "page":
        _filter["page"] = value;
        break;
      case "cuisine":
        let checked = event.target.checked;
        let cuisine = filter.cuisine === undefined ? [] : [...filter.cuisine];
        if (checked) {
          let isAvailable = cuisine.includes(Number(value));
          if (isAvailable === false) cuisine.push(Number(value));
        } else {
          let position = cuisine.indexOf(Number(value));
          cuisine.splice(position, 1);
        }
        if (cuisine.length > 0) _filter["cuisine"] = cuisine;

        break;
    }

    setFilter({ ...filter, ..._filter });
  };

  useEffect(() => {
    getLocationList();
  }, []);

  useEffect(() => {
    getFilterDetails(filter);
  }, [filter]);

  return (
    <>
      <Header bgColor="bg-danger" />
      <section className="col-lg-8 col-10 text-center mt-4 d-flex justify-content-center">
        <h3 className="black ms-0">
          Breakfast Places in Mumbai
        </h3>
      </section>
      {/* food filter */}
      <footer className="d-lg-flex flex-lg-row ms-lg-5 d-flex flex-column align-items-center">
        <SearchFilter LocationList={LocationList} filterData={filterData} />
        <SearchResult
          searchList={searchList}
          pageCount={pageCount}
          filterData={filterData}
        />
      </footer>
    </>
  );
}

export default SearchPage;
