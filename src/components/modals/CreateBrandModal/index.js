import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand} from "../../../http/deviceAPI";

const CreateBrandModal = ({show, onHide}) => {
    const [valueBrand, setValueBrand] = useState('')

    const addBrand = () => {
        createBrand({name: valueBrand}).then(data => {
            setValueBrand('');
            onHide();
        });
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить брэнд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={valueBrand} onChange={(e) => setValueBrand(e.target.value)} placeholder="введите название брэнда"/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addBrand}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrandModal;
