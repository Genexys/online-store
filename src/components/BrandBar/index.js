import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Card, ListGroup, Row} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context);

    return (

        <Row className="d-flex">
            {device.brands.map(brand =>
                <Card
                    className="p-3"
                    style={{cursor: 'pointer'}}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                    onClick={() => device.setSelectedBrand(brand)}
                    key={brand.id}
                >
                    {brand.name}
                </Card>
            )}
        </Row>


        // <ListGroup className="mt-5">
        //     {device.brands.map(brand =>
        //         <ListGroup.Item
        //             style={{cursor: 'pointer'}}
        //             active={brand.id === device.selectedBrand.id }
        //             onClick={() => device.setSelectedBrand(brand)}
        //             key={brand.id}
        //         >{brand.name}</ListGroup.Item>)}
        // </ListGroup>
    );
});

export default BrandBar;
