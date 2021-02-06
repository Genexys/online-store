import React from 'react';
import {Button, Card, Col} from 'react-bootstrap';
import { AiFillStar } from 'react-icons/ai'
import {useHistory} from "react-router-dom";
import {DEVICE_ROUTE} from "../../utils/consts";

const DeviceCard = ({device: {id, img, name, price, rating}}) => {

    const history = useHistory();

    return (
        <Col md={3}>
            <Card className="mb-3 pt-3">
                <Card.Img variant="top" src={process.env.REACT_APP_API_URL + img} style={{width: 100, margin: 'auto'}} onClick={() => history.push(DEVICE_ROUTE + '/' + id)}/>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle className="d-flex align-items-center mb-2 text-muted"><span className="mr-1">{rating}</span> <AiFillStar/> </Card.Subtitle>
                    </div>
                    <Card.Text>
                        {price}
                    </Card.Text>
                    <Button variant="primary">Купить</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default DeviceCard;
