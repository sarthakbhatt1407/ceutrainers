import { createStore } from "redux";

// Initial state
const defaultState = {
  isLoggedIn: false,
  userId: "",
  isAdmin: false,
  labelName: "",
  cart: [], // Add cart to the state
};

// Reducer to handle different actions
const storeReducer = (state = defaultState, action) => {
  if (action.type === "log in") {
    const data = action.data;
    const user = data.user;

    const obj = {
      ...state,
      isLoggedIn: true,
      userId: user.id,
      labelName: user.name,
      isAdmin: user.isAdmin,
    };

    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      isLoggedIn: true,
      userId: user.id,
      labelName: user.name,
      isAdmin: user.isAdmin,
    };
  }

  if (action.type === "logout") {
    localStorage.clear();
    return { ...defaultState };
  }

  if (action.type === "reload") {
    return {
      ...action.data,
    };
  }

  if (action.type === "add to cart") {
    return {
      ...state,
      cart: [...state.cart, action.data], // Add the selected item to cart
    };
  }

  return state;
};

// Create Redux store
const store = createStore(storeReducer);

export default store;
