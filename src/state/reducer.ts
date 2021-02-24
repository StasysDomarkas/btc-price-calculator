import { Action } from "./actions"

export interface State {
  apiBpiData: Array<any>;
  apiTimeData: object;
  defaultSelectedCurrencies: string[],
  removeButtonTouched: boolean,
  inputValue: number;
  axiosError: boolean;
}

const initialState = {
  apiBpiData: [],
  apiTimeData: {},
  defaultSelectedCurrencies: [],
  removeButtonTouched: false,
  inputValue: 1,
  axiosError: false
}

export const reducer = (state: State = initialState, action: Action) => {
  switch(action.type){
    case "GET_API_DATA": {
      return {...state, apiBpiData:  action.payload};
    }
    case "GET_API_TIME_DATA": {
        return {...state, apiTimeData:  action.payload};
      }
    case "SET_DEFAULT_SELECTED_CURRENCIES": {
      return {...state, defaultSelectedCurrencies:  action.payload};
    }
    case "SET_INPUT_VALUE": {
        return {...state, inputValue: action.payload};
      }
    case "SET_REMOVE_TOUCHED": {
      return {...state, removeButtonTouched: action.payload};
    }
    case "SET_AXIOS_ERROR": {
      return {...state, axiosError: action.payload};
    }
    default:
      return state
  }
}