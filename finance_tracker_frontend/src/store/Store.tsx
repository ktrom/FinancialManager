import { createStore } from "redux";

const initialState = {
  addItemModal: {
    name: "",
    value: 0,
  },
};

function reducer(state = initialState, action: any) {
  if (action.type === "UPDATE_NEW_ITEM_NAME") {
    return Object.assign({}, state, {
      addItemModal: { name: action.payload, value: state.addItemModal.value },
    });
  }
  if (action.type === "UPDATE_NEW_ITEM_VALUE") {
    return Object.assign({}, state, {
      addItemModal: { name: state.addItemModal.name, value: action.payload },
    });
  }

  return state;
}

const defaultStore = createStore(reducer);

export default defaultStore;
