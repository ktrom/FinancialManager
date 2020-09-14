import { ADD_ITEM, ADD_VALUE, TOGGLE_MODAL } from "./actions";
import { combineReducers } from "redux";

const initialState = {
  add_item: "",
  add_value: "",
  isAddItemModalShowing: false,
};

function items(state = [], action: any) {
  // For now, don't handle any actions
  // and just return the state given to us.
  switch (action.type) {
    case ADD_ITEM:
      return Object.assign({}, state, {
        add_item: action.name,
      });
      break;
    case ADD_VALUE:
      return Object.assign({}, state, {
        add_value: action.value,
      });
      break;
    case TOGGLE_MODAL:
      return Object.assign({}, state, {
        isAddItemModalShowing: action.open,
      });
      break;

    // look up React Reducers page in order to do patterns (reducer composition)
    // important for managing different parts of the global state
    default:
      return state;
  }
}

const itemApp = combineReducers({
  items,
});

export default itemApp;
