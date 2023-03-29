import classes from "./Meal.module.css";
import Card from "../../UI/Card";
import MealForm from "./MealForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

const Meal = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    console.log("MEAL: " + amount);
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });

    console.log("cart ctx: " + cartCtx.items.length);
  };

  return (
    <li key={props.id}>
      <div className={classes.meal}>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default Meal;
