import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const URL_PATH =
  "https://react-app-1992-default-rtdb.europe-west1.firebasedatabase.app/orders.json";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckoutShown, setIsCheckoutShown] = useState(false);
  const [isButtonsShown, setIsButtonsShow] = useState(true);

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

  async function onSubmitOrderHandler(userData) {
    const order = {
      cart: cartCtx.items,
      user: userData
    };
    const response = await fetch(URL_PATH, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    console.log("********************");
    console.log(data);
  }

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
  const onHideCheckoutHandler = () => {
    setIsCheckoutShown(false);
    setIsButtonsShow(true);
  };
  const onOrderHandler = () => {
    setIsCheckoutShown(true);
    setIsButtonsShow(false);
    //props.onHideCart();
  };

  const buttonsSection = (
    <div>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal>
      <h1>Cart order</h1>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>

      <div className={classes.actions}>
        {isCheckoutShown && (
          <Checkout
            onHideCheckout={onHideCheckoutHandler}
            onSubmitOrder={onSubmitOrderHandler}
          />
        )}
        {isButtonsShown && buttonsSection}
      </div>
    </Modal>
  );
};

export default Cart;
