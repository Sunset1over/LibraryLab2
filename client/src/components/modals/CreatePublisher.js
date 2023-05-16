import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { createPublisher } from "../../http/bookApi";

const CreatePublisher = ({ show, onHide }) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const addPublisher = () => {
        if (value.trim()) {
            createPublisher({ name: value }).then(data => {
                setValue('');
                onHide();
            });
        } else {
            setError('Please enter a name for the publisher.');
        }
    }

    const handleClose = () => {
        setValue('');
        setError('');
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new publisher
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Enter publisher name..."}
                    />
                    {error && <p className="text-danger mt-2">{error}</p>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>Close</Button>
                <Button variant="outline-success" onClick={addPublisher}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePublisher;
