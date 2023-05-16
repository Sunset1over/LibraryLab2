import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {ListGroup} from "react-bootstrap";
import {Context} from "../index";

const TypeBar = observer(() => {
    const {book} = useContext(Context)
    return (
        <ListGroup>
            <div className="mt-2" style={
                {fontSize: 24, textAlign: "center", paddingBottom: 10}
            }>
                Types
            </div>
            {book.types.map(type =>
                <ListGroup.Item
                    style={{cursor: "pointer"}}
                    active={type.id === book.selectedType.id}
                    onClick={() => book.setSelectedType(type)}
                    key={type.id}
                >
                        {type.name}
                </ListGroup.Item>
            )}
            <div className="mt-2" style={
                {fontSize: 24, textAlign: "center", paddingBottom: 10}
            }>
                Publishers
            </div>
            {book.publishers.map(publisher =>
                <ListGroup.Item
                    style={{cursor: "pointer"}}
                    active={publisher.id === book.selectedPublisher.id}
                    onClick={() => book.setSelectedPublisher(publisher)}
                    key={publisher.id}
                >
                    {publisher.name}
                </ListGroup.Item>
            )}
        </ListGroup>

    );
});

export default TypeBar;