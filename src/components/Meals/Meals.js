import { Fragment } from "react";
import AvailableMeals from "./AvailableMeals";
import MealsDescription from "./MealsDescription";

const Meals = () => {
  return (
    <Fragment>
      <MealsDescription />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
