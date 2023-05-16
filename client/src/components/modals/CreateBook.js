import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {Context} from "../../index";
import {createBook, fetchPublishers, fetchTypes} from "../../http/bookApi";
import {observer} from "mobx-react-lite";

const CreateBook = observer(({show, onHide}) => {
    const {book} = useContext(Context)
    const [name, setName] = useState('')
    const [language, setLanguage] = useState('')
    const [origin_language, setOriginLanguage] = useState('')
    const [cover, setCover] = useState('')
    const [count_of_pages, setCountOfPages] = useState(0)
    const [translator, setTranslator] = useState('')
    const [year_of_publishing, setYearOfPublishing] = useState(0)
    const [file, setFile] = useState(null)

    const [updateCount, setUpdateCount] = useState(0);

    useEffect(() => {
        fetchTypes().then(data => book.setTypes(data))
        fetchPublishers().then(data => book.setPublishers(data))
    }, [updateCount]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setUpdateCount(prevCount => prevCount + 1);
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addBook = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('language', `${language}`)
        formData.append('origin_language', `${origin_language}`)
        formData.append('cover', `${cover}`)
        formData.append('pages', `${count_of_pages}`)
        formData.append('translator', `${translator}`)
        formData.append('year_of_publishing', `${year_of_publishing}`)
        formData.append('typeId', book.selectedType.id)
        formData.append('publisherId', book.selectedPublisher.id)
        formData.append('img', file)
        createBook(formData).then(() => {
            setName("");
            setLanguage("");
            setOriginLanguage("");
            setCover("");
            setCountOfPages(0);
            setTranslator("");
            setYearOfPublishing(0);
            setFile(null);
            book.setSelectedType({});
            book.setSelectedPublisher({});
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new book
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-1"
                        placeholder="Enter name book..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter language..."
                        value={language}
                        onChange={e => setLanguage(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter origin_language..."
                        value={origin_language}
                        onChange={e => setOriginLanguage(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter cover..."
                        value={cover}
                        onChange={e => setCover(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter count of pages..."
                        type="number"
                        value={count_of_pages}
                        onChange={e => setCountOfPages(Number(e.target.value))}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter translator..."
                        value={translator}
                        onChange={e => setTranslator(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter year_of_publishing..."
                        type="number"
                        value={year_of_publishing}
                        onChange={e => setYearOfPublishing(Number(e.target.value))}
                    />
                    <div className="d-flex align-items-center justify-content-around">
                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle>{book.selectedType.name || "Choose type"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {book.types.map(type =>
                                    <Dropdown.Item
                                        onClick={() => book.setSelectedType(type)}
                                        key={type.id}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle>{book.selectedPublisher.name || "Choose publisher"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {book.publishers.map(publisher =>
                                    <Dropdown.Item
                                        onClick={() => book.setSelectedPublisher(publisher)}
                                        key={publisher.id}
                                    >
                                        {publisher.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Form.Control
                        type="file"
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addBook}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateBook;