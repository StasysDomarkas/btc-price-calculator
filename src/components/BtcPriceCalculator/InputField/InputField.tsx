import React, { ChangeEvent, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../state/reducer";
import { setInputValue } from "../../../state/actions";
import "./InputField.css";

const InputField: FC = () => {
  const inputValue: any = useSelector<State>((state) => state.inputValue);

  const dispatch = useDispatch();

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(+event.target.value));
  };

  return (
    <input
      className="Input-field"
      type="number"
      placeholder="Enter BTC value"
      value={inputValue.toString()}
      onChange={(event) => inputChangeHandler(event)}
    />
  );
};

export default InputField;
