import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { updateType } from "../../http/bookApi";

const UpdateType = ({ show, onHide }) => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    const handleUpdateType = async () => {
        if (isNaN(id)) {
            alert("ID must be a number!");
            return;
        }
        try {
            await updateType(Number(id), name);
            onHide();
        } catch (e) {
            console.error("Failed to update type:", e.message);
            alert(e.message);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Enter id updated type..."}
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder={"Enter name updated type..."}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Close
                </Button>
                <Button variant="outline-success" onClick={handleUpdateType}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateType;
