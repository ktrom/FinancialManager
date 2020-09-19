export const ADD_ITEM = "ADD_ITEM";
export const ADD_VALUE = "ADD_VALUE";
export const TOGGLE_MODAL = "TOGGLE_MODAL";
export function addItemAction(name: string) {
  return { type: ADD_ITEM, name: name };
}

export function addValueAction(value: number) {
  return { type: ADD_VALUE, value: value };
}

export function toggleAddItemModal(open: boolean) {
  return { type: TOGGLE_MODAL, open: open };
}
