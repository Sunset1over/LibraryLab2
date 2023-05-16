import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import {updatePublisher} from "../../http/bookApi";

const UpdatePublisher = ({ show, onHide }) => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    const handleUpdatePublisher = async () => {
        if (isNaN(id)) {
            alert("ID must be a number!");
            return;
        }
        try {
            await updatePublisher(Number(id), name);
            onHide();
        } catch (e) {
            console.error("Failed to update publisher:", e.message);
            alert(e.message);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update publisher
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Enter id updated publisher..."}
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder={"Enter name updated publisher..."}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Close
                </Button>
                <Button variant="outline-success" onClick={handleUpdatePublisher}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdatePublisher;
