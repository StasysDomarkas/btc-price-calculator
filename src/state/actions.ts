export type Action = { type: string; payload: any };

export const fetchApiData = (apiData: any): Action => ({
  type: "GET_API_DATA",
  payload: apiData,
});

export const fetchApiTimeData = (apiTimeData: object): Action => ({
    type: "GET_API_TIME_DATA",
    payload: apiTimeData,
  });

export const setDefaultSelectedCurrencies = (defaultSelectedCurrencies: object): Action => ({
  type: "SET_DEFAULT_SELECTED_CURRENCIES",
  payload: defaultSelectedCurrencies,
});

export const setInputValue = (inputValue: number): Action => ({
    type: "SET_INPUT_VALUE",
    payload: inputValue,
  });

export const setRemoveTouched = (removeButtonTouched: boolean): Action => ({
  type: "SET_REMOVE_TOUCHED",
  payload: removeButtonTouched,
});

export const setAxiosError = (axiosError: boolean): Action => ({
  type: "SET_AXIOS_ERROR",
  payload: axiosError,
});