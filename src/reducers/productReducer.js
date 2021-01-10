import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE } from "../action/types";

const initialState = { items: [], filteredItems: [], size: "  " };
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, items: action.payload, filteredItems: action.payload };
    case FILTER_PRODUCTS_BY_SIZE:
      return {
        ...state,
        filteredItems: action.payload.payload,
        size: action.payload.size,
      };
    default:
      return state;
  }
}
