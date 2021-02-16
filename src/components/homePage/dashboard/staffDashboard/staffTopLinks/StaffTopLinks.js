/** @format */

import React from "react";
import { Row, Col, Space, Card } from "antd";
import styled from "styled-components";
import { UnlockOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import * as ROUTES from "../../../../../constants/routes";
import { Link } from "react-router-dom";

const StaffTopLinks = ({ match }) => {
    const Container = styled.div`
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media only screen and (max-width: 996px) {
            display: flex;
            flex-flow: column;
        }
    `;
    const ButtonOne = styled.button`
        width: 100%;
        height: 160px;
        border-style: none;
        background: #c8e4ff;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        cursor: pointer;
        outline: none;
        color: black;
        padding: 25px;
        margin: 15px;
        a {
            color: black;
        }
    `;

    const ButtonTwo = styled.button`
        width: 100%;
        height: 160px;
        border-style: none;
        background: #ffd95e;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        cursor: pointer;
        outline: none;
        a {
            color: black;
        }
        padding: 25px;
        margin: 15px;
    `;

    const ButtonThree = styled.button`
        width: 100%;
        height: 160px;
        border-style: none;
        background: #1890ff;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        cursor: pointer;
        outline: none;
        color: white;
        padding: 25px;
        margin: 15px;
        a {
            color: white;
        }
    `;

    return (
        <>
            <Card type="inner" hoverable className="cards-border">
                <Container>
                    <ButtonOne>
                        <Link to={`${match.path}${ROUTES.STUDENTS}`}>
                            <h3>
                                <strong>
                                    <TeamOutlined /> Students
                                </strong>
                            </h3>
                            Manage & Tracking Report
                        </Link>
                    </ButtonOne>
                    <ButtonTwo>
                        <Link to={`${match.path}${ROUTES.ADD_MENTORS}`}>
                            <h3>
                                {" "}
                                <strong>
                                    <UserOutlined /> Mentors
                                </strong>
                            </h3>
                            Manage & Tracking Report
                        </Link>
                    </ButtonTwo>
                    <ButtonThree>
                        <h3>
                            <strong style={{ color: "#fff" }}>
                                <UnlockOutlined /> Staff Admin
                            </strong>
                        </h3>
                        Manage & Authorization
                    </ButtonThree>
                </Container>
            </Card>
        </>
    );
};
export default StaffTopLinks;
