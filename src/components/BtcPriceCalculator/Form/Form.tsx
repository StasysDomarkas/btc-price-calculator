import React, { FC, useState } from "react";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import InputField from "../InputField/InputField";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../state/reducer";
import {
  setDefaultSelectedCurrencies,
  setRemoveTouched,
} from "../../../state/actions";
import "./Form.css";

const Form: FC = () => {
  const defaultSelectedCurrencies: any = useSelector<State>(
    (state) => state.defaultSelectedCurrencies
  );

  const dispatch = useDispatch();

  const inputValue: any = useSelector<State>((state) => state.inputValue);

  const apiData: any = useSelector<State>((state) => state.apiBpiData);

  const removeSelectedCurrency = (code: string) => {
    dispatch(setRemoveTouched(true));
    const selectedCurrencies = defaultSelectedCurrencies.filter(
      (e: string) => e !== code
    );
    dispatch(setDefaultSelectedCurrencies(selectedCurrencies));
  };

  const renderCurrenciesRates = apiData
    .filter((el: { code: string }) =>
      defaultSelectedCurrencies.includes(el.code)
    )
    .map((rate: { code: string; rate_float: number }, index: number) => (
      <div className="Currency-field" key={index}>
        <div>{rate.code}</div>
        <div>
          {Intl.NumberFormat(rate.code, {
            style: "currency",
            currency: rate.code,
          }).format(rate.rate_float * inputValue)}
        </div>
        <button
          className="Currency-field-remove-button"
          onClick={() => removeSelectedCurrency(rate.code)}
        >
          X
        </button>
      </div>
    ));

  return (
    <div className="Form">
      <h1>Enter BTC amount</h1>
      <InputField />
      <div className="Currency">
        {defaultSelectedCurrencies.length > 0 ? (
          <div className="Currency-field-wrapper">{renderCurrenciesRates}</div>
        ) : (
          <div className="Currency-message">Please add currency</div>
        )}
      </div>
      {defaultSelectedCurrencies.length < apiData.length ? (
        <DropDownMenu />
      ) : null}
    </div>
  );
};

export default Form;
