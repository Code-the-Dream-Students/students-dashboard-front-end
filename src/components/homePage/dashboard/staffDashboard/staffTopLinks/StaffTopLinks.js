/** @format */

import React from "react";
import { Row, Col, Space, Card } from "antd";
import styled from "styled-components";
import { UnlockOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import * as ROUTES from "../../../../../constants/routes";
import { Link } from "react-router-dom";

const StaffTopLinks = ({ match }) => {
    const ButtonOne = styled.button`
        width: 100%;
        height: 103px;
        border-style: none;
        background: #c8e4ff;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        cursor: pointer;
        outline: none;
        margin: 5px;
    `;

    const ButtonTwo = styled.button`
        width: 100%;
        height: 103px;
        border-style: none;
        background: #ffd95e;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        cursor: pointer;
        outline: none;
        margin: 5px;
    `;

    const ButtonThree = styled.button`
        width: 100%;
        height: 103px;
        border-style: none;
        background: #1890ff;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        cursor: pointer;
        outline: none;
        margin: 5px;
        color: white;
    `;

    return (
        <>
            <Card type="inner" hoverable className="cards-border">
                <Row>
                    <Col xs={24} xl={8}>
                        <Link to={`${match.path}${ROUTES.STUDENTS}`}>
                            <ButtonOne>
                                <h3>
                                    <strong>
                                        <TeamOutlined /> Students
                                    </strong>
                                </h3>
                                Manage & Tracking Report
                            </ButtonOne>
                        </Link>
                    </Col>

                    {/* <Col xs={24} xl={8}>
                        <Link to={`${match.path}${ROUTES.ADD_MENTORS}`}>
                            <ButtonTwo>
                                <h3>
                                    {" "}
                                    <strong>
                                        <UserOutlined /> Mentors
                                    </strong>
                                </h3>
                                Manage & Tracking Report
                            </ButtonTwo>
                        </Link>
                    </Col>

                    <Col xs={24} xl={8}>
                        <ButtonThree>
                            <h3>
                                <strong style={{ color: "#fff" }}>
                                    <UnlockOutlined /> Staff Admin
                                </strong>
                            </h3>
                            Manage & Authorization
                        </ButtonThree>
                    </Col> */}

                </Row>
            </Card>
        </>
    );
};
export default StaffTopLinks;
