import React, {useContext, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import TypeBar from "../components/typeBar";
import BookList from "../components/BookList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBooks, fetchPublishers, fetchTypes} from "../http/bookApi";
import Pages from "../components/Pages";

const Home = observer(() => {
    const {book} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => book.setTypes(data))
        fetchPublishers().then(data => book.setPublishers(data))
        fetchBooks(null, null, 1, 4)
            .then(data => {
                book.setBooks(data.rows)
                book.setTotalCount(data.count)
            })
    }, [])

    useEffect(() => {
        fetchBooks(book.selectedType.id, book.selectedPublisher.id, book.page, 4).then(data => {
            book.setBooks(data.rows)
            book.setTotalCount(data.count)
        })
    }, [book.page, book.selectedType, book.selectedPublisher,])

    return (
        <div>
            <Container>
                <Row className="mt-3">
                    <Col md={3}>
                        <TypeBar />
                    </Col>
                    <Col md={9}>
                        <BookList />
                        <Pages />
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default Home;