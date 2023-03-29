import { Fragment, useContext } from "react";
import ReactDOM from "react-dom";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = cartCtx.totalAmount.toFixed(2) + "$";
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    console.log("ID in cart: " + id);
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    const newItem = {
      ...item,
      amount: 1
    };
    cartCtx.addItem(newItem);
  };

  const cartItems = (
    <ul className={classes.cart_items}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  const onOrderHandler = () => {
    console.log("processing order...");
    props.onHideCart();
  };

  return (
    <Modal>
      <h1>WITAM</h1>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={onOrderHandler}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
