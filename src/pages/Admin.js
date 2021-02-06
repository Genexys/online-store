import React, { useState } from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrandModal from "../components/modals/CreateBrandModal";
import CreateDeviceModal from "../components/modals/CreateDeviceModal";
import CreateTypeModal from "../components/modals/CreateTypeModal";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);

    return (
        <Container className="d-flex flex-column justify-content-center pt-4">
            <Button variant={"outline-dark"} className="mb-3" onClick={() => setTypeVisible(!typeVisible)}>Добавить тип</Button>
            <Button variant={"outline-dark"} className="mb-3" onClick={() => setBrandVisible(!brandVisible)}>Добавить бренд</Button>
            <Button variant={"outline-dark"} className="mb-3" onClick={() => setDeviceVisible(!deviceVisible)}>Добавить устройство</Button>

            <CreateTypeModal show={typeVisible} onHide={() => setTypeVisible(!typeVisible)}/>
            <CreateDeviceModal show={deviceVisible} onHide={() => setDeviceVisible(!deviceVisible)}/>
            <CreateBrandModal show={brandVisible} onHide={() => setBrandVisible(!brandVisible)}/>
        </Container>
    );
};

export default Admin;
