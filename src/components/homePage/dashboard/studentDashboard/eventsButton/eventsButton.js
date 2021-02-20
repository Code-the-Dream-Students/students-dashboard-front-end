/** @format */

import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { StyledDiv } from "./styles.js";
import { CalendarOutlined } from "@ant-design/icons";
import * as ROUTES from "../../../../../constants/routes";

const EventsButton = () => {
    return (
        <>
            <StyledDiv>
                <Button
                    type="primary"
                    block
                    as="a"
                    href={`${ROUTES.HOME}${ROUTES.CALENDAR}`}
                    className="shadow"
                    style={{ marginBottom: "8px" }}>
                    <CalendarOutlined /> List of Events
                </Button>
            </StyledDiv>
        </>
    );
};

export default EventsButton;
