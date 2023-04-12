import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import Meal from "./Item/Meal";

const URL_PATH =
  "https://react-app-1992-default-rtdb.europe-west1.firebasedatabase.app/meals.json";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchedMeals = async () => {
      const response = await fetch(URL_PATH);
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json(); //data jest obiektem, trzeba zamienic go w tablice obiektow
      const loadedData = [];
      for (const key in data) {
        loadedData.push({
          id: key,
          name: data[key].name,
          price: data[key].price,
          description: data[key].description
        });
      }
      setMeals(loadedData);
      setIsLoading(false);
    };
    fetchedMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []); //if dependencies is not set data will be fetched only once

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <p>data is loading...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={classes.error}>
        <p>{error}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => {
    return (
      <Meal
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        key={meal.id}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
