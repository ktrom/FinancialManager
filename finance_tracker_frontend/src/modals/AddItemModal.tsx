import { MainContent } from "../Enums/MainContent";
import MonthlyFinanceAssigner from "../MonthlyFinanceAssigner";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { jsx } from "@emotion/core";

type AddItemModalProps = {
  addItem(name: string, value: number): void;
  setShowModal(show: boolean): void;
  showModal: boolean;
};

function AddItemModal(props: AddItemModalProps) {
  const [name, setName] = React.useState<string>("");
  const [value, setValue] = React.useState<number>(0);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={props.showModal}
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              placeholder="Enter name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Item Value</Form.Label>
            <Form.Control
              placeholder="Enter value"
              onChange={(e) => {
                setValue(parseFloat(e.target.value));
              }}
            />
          </Form.Group>
          <br />
          <div css={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              variant="primary"
              type="submit "
              onClick={(e) => {
                props.addItem(name, value);
              }}
            >
              Add Item
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={(e) => {
            props.setShowModal(false);
          }}
        >
          Close/Don't Add Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddItemModal;
