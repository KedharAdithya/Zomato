import React from "react";
import { useNavigate } from "react-router-dom";

function QuickSearchItem(props) {
  let { meal } = props;
  let navigate = useNavigate();
  let goToQuickSearch = (id) => {
    navigate("/quick-search?meal_type=" + id);
  };
  return (
    <>
      <section
        className="px-0 d-flex shadow border quick-search-item mb-5"
        onClick={() => goToQuickSearch(meal.meal_type)}
      >
        <img
          src={`./image/${meal.image}`}
          alt={meal.name}
          className="image-item"
        />
        <div className="pt-3 px-2">
          <h4 className="text-navy">{meal.name}</h4>
          <p className="small text-muted">{meal.content}</p>
        </div>
      </section>
    </>
  );
}

export default QuickSearchItem;
