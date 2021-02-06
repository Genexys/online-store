import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Dropdown, Form, Modal, Row, Table} from "react-bootstrap";
import uuid from 'react-uuid'
import {Context} from "../../../index";
import {createDevice, fetchBrand, fetchDevice, fetchTypes} from "../../../http/deviceAPI";



const CreateDeviceModal = observer(({show, onHide}) => {
    const {device} = useContext(Context);
    const [nameDevice, setNameDevice] = useState('');
    const [priceDevice, setPriceDevice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrand().then(data => device.setBrands(data))
    }, []);

    const addInfo = () => {
        setInfo([...info, {
            id: uuid(),
            title: '',
            description: '',
        }])
    }

    const removeInfo = (id) => {
        const newInfo = info.filter(info => info.id !== id)
        setInfo([...newInfo])
    }

    const changeInfo = (key, value, id) => {
        setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i))
    }

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', nameDevice)
        formData.append('price', `${priceDevice}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then((data) => onHide())
    }

    const selectFile = e => {
        setFile(e.target.files[0])
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
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={() =>
                                        device.setSelectedType(type)}
                                    key={type.id}
                                >{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="mb-3">
                        <Dropdown.Toggle>{device.selectedBrand.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() =>
                                        device.setSelectedBrand(brand)}
                                    key={brand.id}
                                >{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control className="mb-3" placeholder="Называние устройства" value={nameDevice}
                                  onChange={(e) => setNameDevice(e.target.value)}/>
                    <Form.Control className="mb-3" placeholder="Цена устройства" type="number" value={priceDevice}
                                  onChange={(e) => setPriceDevice(Number(e.target.value))}/>
                    <Form.Control className="mb-3" placeholder="Называние устройства" type="file"
                                  onChange={(e) => selectFile(e)}/>
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >Добавить новое свойство</Button>

                    <Table striped bordered hover className="mt-3">
                        <thead>
                        <tr>
                            <th colSpan="3">Характеристики</th>
                        </tr>
                        </thead>
                        <tbody>
                        {info.map(info =>
                            <tr key={info.id}>
                                <td>
                                    <Form.Control
                                        value={info.title}
                                        onChange={(e) => changeInfo('title', e.target.value, info.id)}
                                        placeholder="Название свойства"/>
                                </td>
                                <td>
                                    <Form.Control
                                        value={info.description}
                                        onChange={(e) => changeInfo('description', e.target.value, info.id)}
                                        placeholder="Описание свойства"/>
                                </td>
                                <td>
                                    <Button variant={"outline-danger"}
                                            onClick={() => removeInfo(info.id)}>Удалить</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDeviceModal;
