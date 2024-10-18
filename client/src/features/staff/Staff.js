import React, { useState } from "react";
import {
    Button,
    Row,
    Col,
    Container,
    Image,
    Tab,
    Tabs,
    Nav,
} from "react-bootstrap";

const Staff = () => {
    const [staffName, setStaffName] = useState("");
    const [gender, setGender] = useState(true);
    const [birthday, setBirthday] = useState(null);
    const [address, setAddress] = useState("");

    return (
        <>
            <Container>
                <div className="mt-5 mx-2 py-4 border rounded">
                    <h3 className="ms-4 my-4">Staff</h3>
                    <div className="d-flex">
                        <div className="me-5 ms-4">
                            <Image src="" rounded className="border" />
                            <p className="text-center">Staff 1</p>
                        </div>
                        <div className="me-5 ms-4">
                            <Image src="" rounded className="border" />
                            <p className="text-center">Staff 2</p>
                        </div>
                        <div className="me-5 ms-4">
                            <Image src="" rounded className="border" />
                            <p className="text-center">Staff 3</p>
                        </div>
                    </div>
                    <div className="ms-4 my-3">
                        <Button variant="primary" href="/staff/add">Add</Button>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Staff;
