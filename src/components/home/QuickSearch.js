import React, { useEffect, useState } from "react";
import axios from "axios";
import QuickSearchItem from "./QuickSearchItem";

function QuickSearch() {
  let [mealType, setMealType] = useState([]);
  let getQuickSearchData = async () => {
    let URL = "https://zomato-clone-api-2.herokuapp.com/api/get-meal-type"; // url from zomato APi (backend)
    try {
      let response = await axios.get(URL);
      let { meal_type, status } = response.data;
      if (status) {
        setMealType([...meal_type]);
      } else {
        alert("unable to fetch meal_types");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  useEffect(() => {
    getQuickSearchData();
  }, []);

  return (
    <>
      <section className="row justify-content-center">
        <section className="col-10 mt-3">
          <h3 className="fw-0 black">Quick Searches</h3>
          <p className="text-secondary">Discover restaurants by type of meal</p>
        </section>
        <section className="col-10">
          <section className="row py-2">
            <section className="col-12 px-0 d-flex justify-content-between flex-wrap">
              {mealType.map((meal) => {
                return <QuickSearchItem meal={meal} key={meal._id} />;
              })}
            </section>
          </section>
        </section>
      </section>
    </>
  );
}

export default QuickSearch;
