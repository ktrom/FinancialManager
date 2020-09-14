import { ADD_ITEM, ADD_VALUE } from "./actions";
import { combineReducers } from "redux";

const initialState = {
  add_item: "",
  add_value: "",
};

function items(state = [], action: any) {
  // For now, don't handle any actions
  // and just return the state given to us.
  switch (action.type) {
    case ADD_ITEM:
      return Object.assign({}, state, {
        add_item: action.name,
      });
    case ADD_VALUE:
      return Object.assign({}, state, {
        add_value: action.value,
      });
    // case ADD_ITEM_TO_LIST:
    //     return Object.assign({}, state, {
    //         listItems: [
    //             ...state.listItems,
    //             {
    //                 name: action.name,
    //                 value: action.value,
    //             }
    //         ]
    //     })

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
