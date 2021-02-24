import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../state/reducer";
import { setDefaultSelectedCurrencies } from "../../../state/actions";
import "./DropDownMenu.css";

const DropDownMenu: FC = () => {
  const dispatch = useDispatch();

  const apiData: any = useSelector<State>((state) => state.apiBpiData);

  const defaultSelectedCurrencies: any = useSelector<State>(
    (state) => state.defaultSelectedCurrencies
  );

  const [dropDownOpen, setDropDownOpen] = useState(false);

  const addSelectedCurrency = (code: string) => {
    const currencies = [...defaultSelectedCurrencies];
    currencies.push(code);
    dispatch(setDefaultSelectedCurrencies(currencies));
  };

  const renderDropDown = apiData
    .filter(
      (el: { code: string }) => !defaultSelectedCurrencies.includes(el.code)
    )
    .map((el: { code: string }, index: number) => {
      return (
        <a
          className="Drop-down-list-item"
          key={index}
          onClick={() => addSelectedCurrency(el.code)}
        >
          {el.code}
        </a>
      );
    });

  return (
    <div className="Drop-down-menu">
      <button
        className="Drop-down-button"
        onClick={() => setDropDownOpen(() => !dropDownOpen)}
      >
        ADD CURRENCY
      </button>
      {dropDownOpen ? (
        <div className="Drop-down-list-wrapper">
          <div
            className="Drop-down-backdrop"
            onClick={() => setDropDownOpen(() => !dropDownOpen)}
          ></div>
          <div className="Drop-down-list">{renderDropDown}</div>
        </div>
      ) : null}
    </div>
  );
};

export default DropDownMenu;
