import React, {useEffect, useState} from "react";
import {Container, Row, Col, Image, Card, Button, Table, ListGroup} from "react-bootstrap";
import {AiFillStar} from "react-icons/ai";
import {useParams} from "react-router-dom";
import {fetchOneDevice} from "../http/deviceAPI";

const Device = () => {
    const [device, setDevice] = useState({info: []});
    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(id).then((data) => setDevice(data))
    }, []);


    return (
        <Container className="mt-3">
            <Row>
                <Col md={3}>
                    <div className="d-flex align-items-center justify-content-center w-100 mb-3">
                        <Card className="text-center">
                            <Card.Header>
                                <Image src={process.env.REACT_APP_API_URL + device.img} rounded style={{maxWidth: "100%"}}/>
                            </Card.Header>
                            <Card.Body >
                                <Card.Title className="d-flex justify-content-center align-items-center">
                                    <span className="mr-4">{device.name}</span>
                                    <div className="d-flex align-items-center">
                                    <span className="mr-1" style={{fontSize: 18}}>
                                        {device.rating}
                                    </span>
                                        <AiFillStar size={20}/>
                                    </div>
                                </Card.Title>
                                <Card.Text>
                                    {device.price} р
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex align-items-center justify-content-center text-muted"><Button variant="primary">Добавить в корзину</Button></Card.Footer>
                        </Card>
                    </div>
                </Col>
                <Col md={9}>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th colSpan="2">Характеристики</th>
                        </tr>
                        </thead>
                        <tbody>
                        {device.info.map(info =>
                            <tr key={info.id}>
                                <td>{info.title}</td>
                                <td>{info.description}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Device;
