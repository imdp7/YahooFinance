import { combineReducers } from 'redux';
import { ADD_CUSTOMER, REMOVE_FROM_WISHLIST, ADD_TO_WISHLIST, SET_WISHLIST_SYMBOLS, SET_RECENTLY_VISITED_SYMBOLS, ADD_TO_RECENTLY_VISITED} from './actions';

const customerInitialState = {
  email: '',
  email_verified: '',
  sub: '',
  wishlist: {
    symbols: JSON.parse(localStorage.getItem('wishlistSymbols')) || []
  },
  recentlyVisited: {
    symbols: JSON.parse(localStorage.getItem('recentlyVisitedSymbols')) || []
  },
};

const customerReducer = (state = customerInitialState, action) => {
  switch (action.type) {
    case ADD_CUSTOMER:
      return {
        ...state,
        email: action.payload.email,
        email_verified: action.payload.email_verified,
        sub: action.payload.sub,
        wishlist: {
          symbols: action.payload.wishlist.symbols,
        },
        recentlyVisited: {
          symbols: action.payload.recentlyVisited.symbols,
        }
      };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: {
          symbols: [...state.wishlist.symbols, action.payload],
        }
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: {
          symbols: state.wishlist.symbols.filter(symbol => symbol !== action.payload)
        }
      };
      case SET_WISHLIST_SYMBOLS:
      return {
        ...state,
        wishlist: {
          symbols: action.payload,
        },
      };
      case SET_RECENTLY_VISITED_SYMBOLS:
      return {
        ...state,
        recentlyVisited: {
          symbols: action.payload,
        },
      };
    case ADD_TO_RECENTLY_VISITED:
      return {
        ...state,
        recentlyVisited: {
        symbols: [...state.recentlyVisited.symbols, action.payload],
        } 
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  customer: customerReducer,
  // other reducers...
});

export default rootReducer;
