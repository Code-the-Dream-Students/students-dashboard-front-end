/** @format */

import React from "react";
import { Button } from "antd";
import { StyledDiv } from "./styles.js";
import { CalendarOutlined } from "@ant-design/icons";
const EventsStaffButton = () => {
    return (
        <>
            <StyledDiv>
                <Button
                    type="primary"
                    block
                    as="a"
                    href=""
                    className="shadow"
                    style={{ marginBottom: "8px" }}
                >
                    <CalendarOutlined /> List of Events
                </Button>
            </StyledDiv>
        </>
    );
};

export default EventsStaffButton;
