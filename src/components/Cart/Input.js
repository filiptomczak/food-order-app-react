import { forwardRef, useState } from "react";
import classes from "./Input.module.css";

const Input = forwardRef((props, ref) => {
  const [value, setValue] = useState("");
  const isValid = props.onValidationMethod(value);
  props.onInputValidation(isValid);
  props.onFormValidation(props.index, isValid);
  const [wasTouched, setWasTouched] = useState(false);
  const hasError = !isValid && wasTouched;

  const changeHandler = (e) => {
    setValue(e.target.value);
  };
  const blurHandler = () => {
    setWasTouched(true);
  };

  return (
    <div className={classes.main}>
      <label>{props.name}</label>
      <input
        ref={ref}
        className={`${!hasError ? classes.input : classes.invalid}`}
        type={props.type}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
    </div>
  );
});

export default Input;
