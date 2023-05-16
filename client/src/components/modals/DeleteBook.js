import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import {deleteBook} from "../../http/bookApi";

const DeleteBook = ({ show, onHide }) => {
    const [id, setId] = useState("");
    const [error, setError] = useState("");

    const handleDelete = async () => {
        try {
            const parsedId = parseInt(id);
            if (isNaN(parsedId)) {
                setError("Invalid ID. Please enter a number.");
                return;
            }
            await deleteBook(parsedId);
            setId("");
            setError("");
        } catch (e) {
            setError(e.message);
        }
    };

    const handleClose = () => {
        setId('');
        setError('');
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete book
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Enter id deleted book..."}
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </Form>
                {error && <p style={{color: "red"}}>{error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="outline-success" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteBook;
