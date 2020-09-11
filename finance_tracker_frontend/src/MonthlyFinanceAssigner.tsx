/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {MainContent} from "./Enums/MainContent";
import React from "react";
import { DraggableLocation, DropResult} from "react-beautiful-dnd";
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
interface Item{
        id: string,
        content: string,
}

const Header = styled.div({
    backgroundColor: 'lightgrey',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
});

const DroppableContainer = styled.div({
    height: "75vh",
    display: "flex",
    flexDirection:"column",
    margin: 20,
});

const DroppableZone = styled.div({
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
});

function getItems(count: number, offset = 0) : Item[] {
        const items : Item[] = Array.from({ length: count }, (v, k) => k).map(k => ({
                id: `item-${k + offset}`,
                content: `item ${k + offset}`
        }));
        return items;
};


// a little function to help us with reordering the result
function reorder (list : Item[], startIndex : number, endIndex : number) : Item[]{
    const result : Item[] = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source : any, destination : any, droppableSource : DraggableLocation, droppableDestination : DraggableLocation) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result : any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = ( isDragging : boolean, draggableStyle : any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    borderRadius: 10,
    // change background colour if dragging
    background: isDragging ? 'darkgrey' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver : boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: "25vw",
    overflow: "auto",
});

function MonthlyFinanceAssigner () {

    const [state, setState] = React.useState<{items: Item[], selected: Item[]}>({items: getItems(10), selected: getItems(5, 10)});
    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    const id2List : {droppable: Item[], droppable2: Item[]} = {
        droppable: state.items,
        droppable2: state.selected,
    };

    // @ts-ignore
        const getList = (id : string) => id2List[id];

    const onDragEnd = (result : DropResult) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items : Item[] = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            if (source.droppableId === 'droppable2') {
               setState(  {...state, selected: items })
            }
            else{
                setState({...state, items: items})
            }
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <div css={{display: "flex", placeContent: "space-evenly"}}>

                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <DroppableContainer>
                            <Header css={{display:"flex", placeContent:"space-between"}}><div>unassigned items</div> <FontAwesomeIcon icon={faPlus} css={{marginTop: 5, marginRight: 15}}/></Header>
                        <DroppableZone
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {state.items.map((item : Item, index : number) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            {item.content}
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
                        <DroppableContainer>
                            <Header>expense items</Header>
                            <DroppableZone
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {state.selected.map((item : Item, index : number) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            {item.content}
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
        );
}

export default MonthlyFinanceAssigner;