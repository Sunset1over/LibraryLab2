import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {fetchOneBook, fetchPublishers, fetchTypes} from "../http/bookApi";
import Container from "react-bootstrap/Container";
import { Col, Image, Row, Table } from "react-bootstrap";

const BookPage = () => {
    const [book, setBook] = useState({});
    const { id } = useParams();
    const [typeName, setTypeName] = useState("");
    const [publisherName, setPublisherName] = useState("");

    useEffect(() => {
        fetchOneBook(id).then((data) => {
            setBook(data);
            fetchTypes().then(types => {
                const type = types.find(type => type.id === data.typeId);
                setTypeName(type ? type.name : "-");
            });
            fetchPublishers().then(publishers => {
                const publisher = publishers.find(publisher => publisher.id === data.publisherId);
                setPublisherName(publisher ? publisher.name : "-");
            });
        });
    }, [id]);


    return (
        <Container className="mt-3">
            <Row className="justify-content-center align-items-center">
                <Col md={12}>
                    <Image
                        className="mx-auto d-block"
                        width={300}
                        height={300}
                        src={process.env.REACT_APP_API_URL + book.img}
                    />
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Characteristic</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Language:</td>
                        <td>{book.language || "-"}</td>
                    </tr>
                    <tr>
                        <td>Origin Language:</td>
                        <td>{book.origin_language || "-"}</td>
                    </tr>
                    <tr>
                        <td>Cover:</td>
                        <td>{book.cover || "-"}</td>
                    </tr>
                    <tr>
                        <td>Pages:</td>
                        <td>{book.pages || "-"}</td>
                    </tr>
                    <tr>
                        <td>Translator:</td>
                        <td>{book.translator || "-"}</td>
                    </tr>
                    <tr>
                        <td>Year of Publishing:</td>
                        <td>{book.year_of_publishing || "-"}</td>
                    </tr>
                    <tr>
                        <td>Rating:</td>
                        <td>{book.rating}</td>
                    </tr>
                    <tr>
                        <td>Type:</td>
                        <td>{typeName}</td>
                    </tr>
                    <tr>
                        <td>Publisher:</td>
                        <td>{publisherName}</td>
                    </tr>
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
};

export default BookPage;
