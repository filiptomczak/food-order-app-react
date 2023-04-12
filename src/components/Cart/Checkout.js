import { useState, useRef } from "react";
import classes from "./Checkout.module.css";
import Input from "./Input";

const Checkout = (props) => {
  const [isValid, setIsValid] = useState(false);
  const nameRef = useRef("");
  const addressRef = useRef("");
  const zipRef = useRef("");
  const phoneRef = useRef("");

  let validationArray = [];
  const formValidation = (index, isV) => {
    validationArray[index] = isV;
    const validationValue = validationArray.reduce((prev, curr) => {
      return prev + curr;
    }, 0);
    if (validationValue === 4) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const validateHandler = (value) => {
    setIsValid(value);
  };

  const trimValidationHandler = (value) => {
    return value.trim() !== "";
  };
  const zipValidationHandler = (value) => {
    return value.includes("-");
  };
  const numValidationHandler = (value) => {
    return value.length === 9;
  };

  const orderHandler = () => {
    console.log("ordering in process...");
    const orderData = {
      name: nameRef.current.value,
      address: addressRef.current.value,
      zip: zipRef.current.value,
      phone: phoneRef.current.value
    };
    console.log(orderData);
    props.onSubmitOrder(orderData);
  };
  const displayRef = () => {
    console.log(nameRef.current.value);
  };
  return (
    <div className={classes.checkout}>
      <Input
        index="0"
        ref={nameRef}
        name="name"
        type="text"
        onValidationMethod={trimValidationHandler}
        onInputValidation={validateHandler}
        onFormValidation={formValidation}
        onChange={displayRef}
      />
      <Input
        index="1"
        ref={addressRef}
        name="address"
        type="text"
        onValidationMethod={trimValidationHandler}
        onInputValidation={validateHandler}
        onFormValidation={formValidation}
      />
      <Input
        index="2"
        ref={zipRef}
        name="zip"
        type="text"
        onValidationMethod={zipValidationHandler}
        onInputValidation={validateHandler}
        onFormValidation={formValidation}
      />
      <Input
        index="3"
        ref={phoneRef}
        name="phone num"
        type="tel"
        onValidationMethod={numValidationHandler}
        onInputValidation={validateHandler}
        onFormValidation={formValidation}
      />
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={props.onHideCheckout}
        >
          Close
        </button>
        <button
          disabled={!isValid}
          className={classes.button}
          onClick={orderHandler}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Checkout;
