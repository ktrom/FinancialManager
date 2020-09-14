export const ADD_ITEM = "ADD_ITEM";
export const ADD_VALUE = "ADD_VALUE";

export function addItemAction(name: string) {
  return { type: ADD_ITEM, name: name };
}

export function addValueAction(value: number) {
  return { type: ADD_VALUE, value: value };
}
