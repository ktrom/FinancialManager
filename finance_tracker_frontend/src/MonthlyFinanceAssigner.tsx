/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { MainContent } from "./Enums/MainContent";
import React from "react";
import { DraggableLocation, DropResult } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Modal } from "react-bootstrap";
import { connect, ConnectedProps, useDispatch, useStore } from "react-redux";
import {
  addItemAction,
  addValueAction,
  toggleAddItemModal,
} from "./store/items/actions";
import AddItemModal from "./modals/AddItemModal";

interface Item {
  id: string;
  name: string;
  value: number;
  assigned: boolean;
}

const Header = styled.div({
  backgroundColor: "lightgrey",
  padding: 10,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
});

const DroppableContainer = styled.div((props: { isDraggingOver: boolean }) => ({
  maxHeight: "75vh",
  height: "min-content",
  display: "flex",
  flexDirection: "column",
  margin: 20,
  boxShadow: "3px 3px 5px black",
  backgroundColor: props.isDraggingOver ? "lightblue" : "lightgray",
  borderRadius: 10,
}));

const DroppableZone = styled.div({
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
});

function getItems(assigned: boolean): Item[] {
  const items: Item[] = new Array();
  if (assigned) {
    items.push({ id: "0", name: "kyle", value: 200, assigned: true });
  } else {
    items.push({ id: "1", name: "ronson", value: 800, assigned: false });
  }

  return items;
}

// a little function to help us with reordering the result
function reorder(list: Item[], startIndex: number, endIndex: number): Item[] {
  const result: Item[] = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: any,
  destination: any,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  borderRadius: 10,
  // change background colour if dragging
  background: isDragging ? "darkgrey" : "grey",
  boxShadow: "2px 2px 5px black",
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "25vw",
  overflow: "auto",
  margin: 10,
});

function MonthlyFinanceAssigner(props: Props) {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  // const [newItem, setNewItem] = React.useState<{
  //   item_name: string;
  //   item_value: number;
  // }>({ item_name: "", item_value: 0 });
  //

  const [state, setState] = React.useState<{
    unassigned: Item[];
    assigned: Item[];
  }>({ unassigned: getItems(false), assigned: getItems(true) });

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  const id2List: { droppable: Item[]; droppable2: Item[] } = {
    droppable: state.unassigned,
    droppable2: state.assigned,
  };

  // @ts-ignore
  const getList = (id: string) => id2List[id];

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items: Item[] = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId === "droppable2") {
        setState({ ...state, assigned: items });
      } else {
        setState({ ...state, unassigned: items });
      }
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setState({
        unassigned: result.droppable,
        assigned: result.droppable2,
      });
    }
  };

  const addItem = (name: string, value: number) => {
    setState(function (prevState) {
      const items = prevState.unassigned;
      items.push({
        assigned: false,
        id: name + value,
        name: name,
        value: value,
      });
      return { unassigned: items, assigned: prevState.assigned };
    });
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <React.Fragment>
      <div>
        <AddItemModal
          addItem={addItem}
          setShowModal={() => setShowModal(false)}
          showModal={showModal}
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div css={{ display: "flex", placeContent: "space-evenly" }}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <DroppableContainer isDraggingOver={snapshot.isDraggingOver}>
                <Header
                  css={{ display: "flex", placeContent: "space-between" }}
                >
                  <div>unassigned items</div>
                  <div onClick={() => setShowModal(true)}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      css={{ marginTop: 5, marginRight: 15 }}
                    />
                  </div>
                </Header>
                <DroppableZone
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {state.unassigned.map((item: Item, index: number) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </DroppableZone>
              </DroppableContainer>
            )}
          </Droppable>
          <Droppable droppableId="droppable2">
            {(provided, snapshot) => (
              <DroppableContainer isDraggingOver={snapshot.isDraggingOver}>
                <Header>expense items</Header>
                <DroppableZone
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {state.assigned.map((item: Item, index: number) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </DroppableZone>
              </DroppableContainer>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </React.Fragment>
  );
}

const mapStateToProps = () =>
  //         state: {
  //   items: {
  //     add_item: string;
  //     add_value: number;
  //     isAddItemModalShowing: boolean;
  //   };
  // }
  ({
    // addItem: state.items.add_item,
    // addValue: state.items.add_value,
    // showModal: state.items.isAddItemModalShowing,
  });

const mapDispatchToProps = () => ({
  // onNameChange: (name: string) => addItemAction(name),
  // onValueChange: (value: number) => addValueAction(value),
  // toggleModal: (open: boolean) => toggleAddItemModal(open),
});

const connector = connect(mapStateToProps, mapDispatchToProps());

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

export default connector(MonthlyFinanceAssigner);
