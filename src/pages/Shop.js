import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Container, Row, Col} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {Context} from "../index";
import {fetchBrand, fetchDevice, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {device} = useContext(Context);

    useEffect(() => {
       fetchTypes().then(data => device.setTypes(data))
       fetchBrand().then(data => device.setBrands(data))
       fetchDevice(null, null, 1, 1).then(data => {
           device.setDevices(data.rows);
           device.setTotalCount(data.count)
       })
    }, []);

    useEffect(() => {
        fetchDevice(device.selectedType.id, device.selectedBrand.id, device.page, 1).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand])

    return (
        <Container className="pt-5">
            <Row>
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <div  className="pt-4">
                        <DeviceList/>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <Pages/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
