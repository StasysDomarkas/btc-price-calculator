import React, { FC, useEffect } from "react";
import axios from "axios";
import Form from "./Form/Form";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../state/reducer";
import {
  fetchApiData,
  fetchApiTimeData,
  setAxiosError,
  setDefaultSelectedCurrencies,
} from "../../state/actions";
import "./BtcPriceCalculator.css";

const BtcPriceCalculator: FC = () => {
  const dispatch = useDispatch();

  const apiTimeData: any = useSelector<State>((state) => state.apiTimeData);

  const apiData: any = useSelector<State>((state) => state.apiBpiData);

  const defaultSelectedCurrencies: any = useSelector<State>(
    (state) => state.defaultSelectedCurrencies
  );

  const removeButtonTouched: any = useSelector<State>(
    (state) => state.removeButtonTouched
  );

  const axiosError = useSelector<State>((state) => state.axiosError);

  useEffect(() => {
    getApiData();
    const refreshInterval = setInterval(() => {
      getApiData();
    }, 15000);

    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    if (defaultSelectedCurrencies.length === 0 && !removeButtonTouched) {
      const defaults = apiData.map((el: { code: string }) => el.code);
      dispatch(setDefaultSelectedCurrencies(defaults));
    }
  }, [apiData]);

  const getApiData = () => {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((res) => {
        dispatch(fetchApiTimeData(res.data.time));
        dispatch(fetchApiData(Object.values(res.data.bpi)));
      })
      .catch((err) => {
        dispatch(setAxiosError(true));
      });
  };

  return (
    <div className="Btc-calculator">
      {axiosError ? (
        <div>Something went wrong</div>
      ) : (
        <>
          <div className="Btc-calculator-time">
            <a>Currencies last time updated:</a>
            <a>{apiTimeData.updated}</a>
          </div>
          <Form></Form>
        </>
      )}
    </div>
  );
};

export default BtcPriceCalculator;
