import React, { Fragment } from "react";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Feeder App</h1>
        <HeaderCartButton onShowCart={props.onShowCart} />
        <span></span>
      </header>
      <div className={classes.main_image}>
        <img src={mealsImage} alt="Meal photo" />
      </div>
    </Fragment>
  );
};

export default Header;
