import React from'react';

import classes from "./Input.module.css";

const Input = React.forwardRef((props,ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={ref}
        {...props.input} /*automatyczne dodanie propsow jako wlasciwosci elementu */
      />
    </div>
  );
});

export default Input;
