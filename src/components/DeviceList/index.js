import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Row} from "react-bootstrap";
import DeviceCard from "../DeviceCard";

const DeviceList = observer(() => {
    const {device} = useContext(Context)
    console.log(device)
    return (
        <Row className="d-flex">
            {device.devices.map(device =>
                <DeviceCard key={device.id} device={device} />
            )}
        </Row>
    );
});

export default DeviceList;
