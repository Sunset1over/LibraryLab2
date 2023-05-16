import React, {useState} from 'react';
import Container from "react-bootstrap/Container";
import {Button} from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreatePublisher from "../components/modals/CreatePublisher"
import CreateBook from "../components/modals/CreateBook";
import UpdateType from "../components/modals/UpdateType"
import UpdatePublisher from "../components/modals/UpdatePublisher";
import UpdateBook from "../components/modals/UpdateBook";
import DeleteType from "../components/modals/DeleteType";
import DeletePublisher from "../components/modals/DeletePublisher";
import DeleteBook from "../components/modals/DeleteBook";

const Admin = () => {
    const [createPublisherVisible, setCreatePublisherVisible] = useState(false)
    const [deletePublisherVision, setDeletePublisherVision] = useState(false)
    const [updatePublisherVision, setUpdatePublisherVision] = useState(false)

    const [createTypeVisible, setCreateTypeVisible] = useState(false)
    const [deleteTypeVision, setDeleteTypeVision] = useState(false)
    const [updateTypeVision, setUpdateTypeVision] = useState(false)

    const [createBookVisible, setCreateBookVisible] = useState(false)
    const [deleteBookVision, setDeleteBookVision] = useState(false)
    const [updateBookVision, setUpdateBookVision] = useState(false)


    return (
        <Container className="d-flex flex-column mt-4">
            <Button variant={"outline-dark"} onClick={() => setCreateTypeVisible(true)}>Add new type</Button>
            <Button variant={"outline-dark"} onClick={() => setUpdateTypeVision(true)}>Update type</Button>
            <Button variant={"outline-dark"} onClick={() => setDeleteTypeVision(true)}>Delete type</Button>
            <hr/>
            <Button variant={"outline-dark"} onClick={() => setCreatePublisherVisible(true)}>Add new publisher</Button>
            <Button variant={"outline-dark"} onClick={() => setUpdatePublisherVision(true)}>Update publisher</Button>
            <Button variant={"outline-dark"} onClick={() => setDeletePublisherVision(true)}>Delete publisher</Button>
            <hr/>
            <Button variant={"outline-dark"} onClick={() => setCreateBookVisible(true)}>Add new book</Button>
            <Button variant={"outline-dark"} onClick={() => setUpdateBookVision(true)}>Update book</Button>
            <Button variant={"outline-dark"} onClick={() => setDeleteBookVision(true)}>Delete book</Button>


            <CreateType show={createTypeVisible} onHide={() => setCreateTypeVisible(false)}/>
            <DeleteType show={deleteTypeVision} onHide={() => setDeleteTypeVision(false)}/>
            <UpdateType show={updateTypeVision} onHide={() => setUpdateTypeVision(false)}/>

            <CreatePublisher show={createPublisherVisible} onHide={() => setCreatePublisherVisible(false)}/>
            <DeletePublisher show={deletePublisherVision} onHide={() => setDeletePublisherVision(false)}/>
            <UpdatePublisher show={updatePublisherVision} onHide={() => setUpdatePublisherVision(false)}/>

            <CreateBook show={createBookVisible} onHide={() => setCreateBookVisible(false)}/>
            <DeleteBook show={deleteBookVision} onHide={() => setDeleteBookVision(false)}/>
            <UpdateBook show={updateBookVision} onHide={() => setUpdateBookVision(false)}/>
        </Container>
    );
};

export default Admin;