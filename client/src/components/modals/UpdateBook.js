import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {updateBook} from "../../http/bookApi";

const UpdateBook = (({show, onHide}) => {
    const [id, setId] = useState("");
    const [name, setName] = useState('')
    const [language, setLanguage] = useState('')
    const [origin_language, setOriginLanguage] = useState('')
    const [cover, setCover] = useState('')
    const [count_of_pages, setCountOfPages] = useState(0)
    const [translator, setTranslator] = useState('')
    const [year_of_publishing, setYearOfPublishing] = useState(0)
    const [rating, setRating] = useState(0)
    const [typeId, setTypeId] = useState(0)
    const [publisherId, setPublisherId] = useState(0)
    const [file, setFile] = useState(null)

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const handleUpdate = async () => {
        try {
            await updateBook(
                id,
                name,
                language,
                origin_language,
                cover,
                count_of_pages,
                translator,
                year_of_publishing,
                rating,
                typeId,
                publisherId,
                file
            );

            console.log('Информация о книге успешно обновлена.');

            onHide();
        } catch (error) {
            console.error('Произошла ошибка при обновлении информации о книге:', error);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update book
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-1"
                        placeholder="Enter id book..."
                        value={id}
                        onChange={e => setId(Number(e.target.value))}
                    />
                    <Form.Control
                        className="mt-3"
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
                        type="number"
                        value={year_of_publishing}
                        onChange={e => setYearOfPublishing(Number(e.target.value))}
                    />
                    <Form.Control
                        className="mt-3"
                        type="number"
                        value={rating}
                        onChange={e => setRating(Number(e.target.value))}
                    />
                    <Form.Control
                        className="mt-3"
                        type="number"
                        value={typeId}
                        onChange={e => setTypeId(Number(e.target.value))}
                    />
                    <Form.Control
                        className="mt-3"
                        type="number"
                        value={publisherId}
                        onChange={e => setPublisherId(Number(e.target.value))}
                    />
                    <Form.Control
                        type="file"
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={handleUpdate}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateBook;