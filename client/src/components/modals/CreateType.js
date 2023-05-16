import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {createType} from "../../http/bookApi";

const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const addType = () => {
        if (value.trim() === '') {
            setError('Fill in the required field')
            return
        }
        createType({name: value}).then(data => {
            setValue('')
            setError('')
        }).catch(error => console.log(error))
    }

    const handleModalHide = () => {
        setValue('')
        setError('')
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={handleModalHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Enter type name..."}
                    />
                    {error && <div style={{color: 'red'}}>{error}</div>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleModalHide}>Close</Button>
                <Button variant="outline-success" onClick={addType}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;
