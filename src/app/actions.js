export const SET_MODE = 'SET_MODE';
export const SET_DENSITY = 'SET_DENSITY';
export const SET_MOTION = 'SET_MOTION';
export const ADD_CUSTOMER = "ADD_CUSTOMER";
export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
export const SET_WISHLIST_SYMBOLS = "SET_WISHLIST_SYMBOLS";
export const ADD_TO_RECENTLY_VISITED = "ADD_TO_RECENTLY_VISITED";
export const SET_RECENTLY_VISITED_SYMBOLS = "SET_RECENTLY_VISITED_SYMBOLS";

export const setMode = (mode) => ({
  type: SET_MODE,
  payload: mode,
});

export const setDensity = (density) => ({
  type: SET_DENSITY,
  payload: density,
});
export const setMotion = (motion) => ({
  type: SET_MOTION,
  payload: motion,
});
export const addCustomer = (customer) => {
  return {
    type: ADD_CUSTOMER,
    payload: customer,
  };
};

export const addToWishlist = (symbol) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: symbol
    });

    const { customer } = getState();
    localStorage.setItem('wishlistSymbols', JSON.stringify(customer.wishlist.symbols));
  };
};

export const removeFromWishlist = (symbol) => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: symbol
    });

    const { customer } = getState();
    localStorage.setItem('wishlistSymbols', JSON.stringify(customer.wishlist.symbols));
  };
};

export const setWishlistSymbols = (symbols) => ({
  type: SET_WISHLIST_SYMBOLS,
  payload: symbols,
});

export const setRecentlyVisitedSymbols = (symbols) => {
  return {
    type: SET_RECENTLY_VISITED_SYMBOLS,
    symbols,
  };
};

export const addToRecentlyVisited = (symbol) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TO_RECENTLY_VISITED,
      payload: symbol
    });

    const { customer } = getState();
    localStorage.setItem('recentlyVisitedSymbols', JSON.stringify(customer.wishlist.symbols));
  };
};