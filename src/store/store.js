import { createStore } from "redux";

// Initial state
const defaultState = {
  isLoggedIn: false,
  userId: "",
  isAdmin: false,

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
    };

    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      isLoggedIn: true,
      userId: user.id,
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
    const item = action.data;
    const cartItems = state.cart;

    const itemFound = cartItems.find((i) => {
      return i.courseId == item.courseId;
    });
    let updatedCart = state.cart;
    if (itemFound) {
      const itemIndex = cartItems.findIndex((i) => {
        return i.courseId == item.courseId;
      });
      updatedCart[itemIndex] = item;
    } else {
      updatedCart.push(item);
    }

    const obj = {
      ...state,
      cart: updatedCart,
    };

    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      cart: updatedCart,
    };
  }
  if (action.type === "removefromcart") {
    const item = action.data;
    const cartItems = state.cart;

    let updatedCart = cartItems.filter((i) => {
      return i.courseId != item.courseId;
    });

    const obj = {
      ...state,
      cart: updatedCart,
    };

    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      cart: updatedCart,
    };
  }
  // New action to clear the cart
  if (action.type === "clear cart") {
    const obj = {
      ...state,
      cart: [],
    };

    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      cart: [],
    };
  }

  return state;
};

// Create Redux store
const store = createStore(storeReducer);

export default store;
